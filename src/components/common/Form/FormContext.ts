import type FormElement from "@/components/common/Form/FormElement";
import FormValue from "@/components/common/Form/FormValue";
import FormAction from "@/components/common/Form/FormAction";

export interface FormContextOptions {
  onSubmitCallback: (result: unknown) => Promise<void>;
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

  private getFormActions(): FormAction[] {
    return <FormAction[]> this.elements
      .filter(element => element instanceof FormAction);
  }

  private setDisabledActions(disabled: boolean) {
    for (const action of this.getFormActions()) {
      action.setDisabled(disabled);
    }
  }

  async submit(): Promise<unknown> {
    console.log(this);

    const result = {};
    const values = this.getFormValues();

    this.setDisabledActions(true);

    let failed = false;

    for (const value of values) {
      if (!value.validate()) {
        failed = true;
        continue;
      }

      result[value.getName()] = value.getValue();
    }

    if (failed) {
      this.setDisabledActions(false);
      return;
    }

    await this.onSubmitCallback(result);
    this.setDisabledActions(false);

    return result;
  }

  reset() {
    for (const value of this.getFormValues()) {
      value.reset();
    }

    this.onCancelCallback();
  }
}
