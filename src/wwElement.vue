<template>
  <div class="pv-toggle-switch">
    <div class="pv-toggle-switch__inner">
      <PvToggleSwitch
        :modelValue="internalValue"
        :disabled="props.content?.disabled"
        :readonly="props.content?.readonly"
        unstyled
        :pt="passthrough"
        @update:modelValue="handleChange"
      />
      <input
        type="checkbox"
        :name="props.content?.fieldName"
        :checked="internalValue"
        :required="props.content?.required"
        tabindex="-1"
        class="pv-toggle-switch__fake-input"
      />
    </div>
  </div>
</template>

<script>
import { computed, watch, inject } from 'vue';
import { installPrimeVue } from '../shared/install-primevue.js';
import ToggleSwitch from 'primevue/toggleswitch';

export default {
  components: { PvToggleSwitch: ToggleSwitch },
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    wwElementState: { type: Object, default: () => ({}) },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    installPrimeVue();

    // Internal variable — boolean
    const { value: internalValue, setValue: setInternalValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'value',
        type: 'boolean',
        defaultValue: false,
      });

    // Sync initialValue
    watch(
      () => props.content?.initialValue,
      (v) => {
        if (v !== undefined) {
          setInternalValue(!!v);
          emit('trigger-event', { name: 'initValueChange', event: { value: !!v } });
        }
      },
      { immediate: true }
    );

    // Handle toggle change
    const handleChange = (newVal) => {
      const boolVal = !!newVal;
      if (internalValue.value !== boolVal) {
        setInternalValue(boolVal);
        emit('trigger-event', { name: 'change', event: { value: boolVal } });
      }
    };

    // PassThrough
    const passthrough = {
      root: { class: 'pv-toggle-switch__root' },
      input: { class: 'pv-toggle-switch__input' },
      slider: { class: 'pv-toggle-switch__slider' },
    };

    // Form integration
    const fieldName = computed(() => props.content?.fieldName || props.wwElementState?.name);
    const validation = computed(() => props.content?.validation);
    const customValidation = computed(() => props.content?.customValidation);
    const initValue = computed(() => props.content?.initialValue ?? false);

    const useForm = inject('_wwForm:useForm', () => {});
    useForm(
      internalValue,
      { fieldName, validation, customValidation, initialValue: initValue },
      { elementState: props.wwElementState, emit, sidepanelFormPath: 'form', setValue: setInternalValue }
    );

    /* wwEditor:start */
    const selectForm = inject('_wwForm:selectForm', () => {});
    /* wwEditor:end */

    return {
      props,
      internalValue,
      handleChange,
      passthrough,
      /* wwEditor:start */
      selectForm,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped lang="scss">
@import '../shared/styles/base';
@import '../shared/styles/tokens';

.pv-toggle-switch {
  &__inner {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  &__root {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 44px;
    height: 24px;
    cursor: pointer;

    &[data-p-disabled="true"] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  // PrimeVue internal elements — need :deep() for scoped style penetration
  :deep(.pv-toggle-switch__input) {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  :deep(.pv-toggle-switch__slider) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--pv-border, #e2e8f0);
    border-radius: var(--pv-radius-full, 9999px);
    transition: background-color var(--pv-transition, 150ms);

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform var(--pv-transition, 150ms);
    }
  }

  // Checked state — PrimeVue adds data-p-checked="true" on root
  :deep(.pv-toggle-switch__root[data-p-checked="true"]) .pv-toggle-switch__slider {
    background-color: var(--pv-primary, #3B82F6);

    &::before {
      transform: translateX(20px);
    }
  }

  // Focus visible state
  :deep(.pv-toggle-switch__root:focus-visible) .pv-toggle-switch__slider {
    box-shadow: 0 0 0 2px var(--pv-focus-ring, rgba(59, 130, 246, 0.3));
  }

  &__fake-input {
    background: rgba(0, 0, 0, 0);
    border: 0;
    bottom: -1px;
    font-size: 0;
    height: 1px;
    left: 0;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0;
    width: 100%;
  }
}
</style>
