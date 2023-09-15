import FormElement from "@/components/common/Form/FormElement";

export interface FormValueOptions<T> {
  name: string;
  getValue: () => T;
  reset: () => void;
}

export default class FormValue<T> extends FormElement {
  private readonly name: string;
  private readonly extractValue: () => T;
  private readonly runReset: () => void;

  constructor(options: FormValueOptions<T>) {
    super();

    this.name = options.name;
    this.extractValue = options.getValue;
    this.runReset = options.reset;

    if (this.getParent()) {
      this.reset();
    }
  }

  getName(): string {
    return this.name;
  }

  getValue(): T {
    return this.extractValue();
  }

  reset() {
    this.runReset();
  }
}
