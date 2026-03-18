export default {
  editor: {
    label: { en: 'PV Toggle Switch' },
    icon: 'toggle-on',
    customSettingsPropertiesOrder: [
      'formInfobox',
      ['fieldName', 'customValidation', 'validation'],
      'initialValue',
      'disabled',
      'readonly',
      'required',
    ],
  },
  triggerEvents: [
    { name: 'change', label: { en: 'On change' }, event: { value: false }, default: true },
    { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: false } },
  ],
  properties: {
    initialValue: {
      label: { en: 'Init value' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean for the initial toggle state: true | false',
      },
      /* wwEditor:end */
    },
    disabled: {
      label: { en: 'Disabled' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Disable the toggle: true | false',
      },
      /* wwEditor:end */
    },
    readonly: {
      label: { en: 'Read only' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Read only mode: true | false',
      },
      /* wwEditor:end */
    },
    required: {
      label: { en: 'Required' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Required for form validation: true | false',
      },
      /* wwEditor:end */
    },
    /* wwEditor:start */
    form: {
      editorOnly: true,
      hidden: true,
      defaultValue: false,
    },
    formInfobox: {
      type: 'InfoBox',
      section: 'settings',
      options: (_, sidePanelContent) => ({
        variant: sidePanelContent.form?.name ? 'success' : 'warning',
        icon: 'pencil',
        title: sidePanelContent.form?.name || 'Unnamed form',
        content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
        cta: {
          label: 'Select form',
          action: 'selectForm',
        },
      }),
      hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
    },
    /* wwEditor:end */
    fieldName: {
      label: { en: 'Field name' },
      section: 'settings',
      type: 'Text',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The field name for form submission.',
      },
      /* wwEditor:end */
      hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
    },
    customValidation: {
      label: { en: 'Custom validation' },
      section: 'settings',
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Enable custom validation rules.',
      },
      /* wwEditor:end */
      hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
    },
    validation: {
      label: { en: 'Validation' },
      section: 'settings',
      type: 'Formula',
      defaultValue: '',
      bindable: false,
      hidden: (content, sidePanelContent) =>
        !sidePanelContent.form?.uid || !content?.customValidation,
    },
  },
};
