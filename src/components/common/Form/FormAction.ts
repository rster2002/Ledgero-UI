import FormElement from "@/components/common/Form/FormElement";
import type FormContext from "@/components/common/Form/FormContext";

interface FormActionOptions {
  disabled?: (state: boolean) => void;
}

export default class FormAction extends FormElement {
  private readonly setDisabledState?: (state: boolean) => void;

  constructor(options: FormActionOptions = {}) {
    super();

    this.setDisabledState = options.disabled;
  }

  setDisabled(disabled: boolean) {
    this.setDisabledState?.(disabled);
  }

  call(callback: (form: FormContext) => void) {
    if (this.getParent()) {
      callback(this.getParent());
    }
  }
}
