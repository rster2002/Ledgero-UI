import FormElement from "@/components/common/Form/FormElement";
import type FormContext from "@/components/common/Form/FormContext";

export default class FormAction extends FormElement {
  constructor() {
    super();
  }

  call(callback: (form: FormContext) => void) {
    if (this.getParent()) {
      callback(this.getParent());
    }
  }
}
