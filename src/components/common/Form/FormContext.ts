import type FormElement from "@/components/common/Form/FormElement";
import FormValue from "@/components/common/Form/FormValue";

export interface FormContextOptions {
  onSubmitCallback: (result: unknown) => void;
  onCancelCallback: () => void;
}

export default class FormContext {
  private readonly elements: FormElement[] = [];
  private readonly onSubmitCallback: (result: unknown) => void;
  private readonly onCancelCallback: () => void;

  constructor(options: FormContextOptions) {
    this.onSubmitCallback = options.onSubmitCallback;
    this.onCancelCallback = options.onCancelCallback;
  }

  registerElement(element: FormElement) {
    this.elements.push(element);
    element.setParent(this);
  }

  unregisterElement(element: FormElement) {
    const index = this.elements.indexOf(element);

    if (index !== -1) {
      this.elements.splice(index, 1);
      element.setParent(null);
    }
  }

  private getFormValues(): FormValue<unknown>[] {
    return <FormValue<unknown>[]> this.elements
      .filter(element => element instanceof FormValue);
  }

  submit(): unknown {
    const result = {};
    const values = this.getFormValues();

    for (const value of values) {
      result[value.getName()] = value.getValue();
    }

    this.onSubmitCallback(result);

    return result;
  }

  reset() {
    for (const value of this.getFormValues()) {
      value.reset();
    }

    this.onCancelCallback();
  }
}
