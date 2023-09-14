import FormElement from "@/components/common/Form/FormElement";

export interface FormValueOptions<T> {
  name: string;
  getValue: () => T;
}

export default class FormValue<T> extends FormElement {
  private readonly name: string;
  private readonly getValue: () => T;

  constructor(options: FormValueOptions<T>) {
    super();

    this.name = options.name;
    this.getValue = options.getValue;
  }
}
