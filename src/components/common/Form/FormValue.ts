import FormElement from "@/components/common/Form/FormElement";

export interface FormValueOptions<T> {
  name: string;
  getValue: () => T;
  onError?: (message: string | undefined) => void;
  validate?: (value: T) => string | void;
  reset: () => void;
}

export default class FormValue<T> extends FormElement {
  private readonly name: string;
  private readonly extractValue: () => T;
  private readonly runReset: () => void;
  private readonly onError?: (message: string | undefined) => void;
  private readonly validationCallback?: (value: T) => string | void;

  constructor(options: FormValueOptions<T>) {
    super();

    this.name = options.name;
    this.extractValue = options.getValue;
    this.runReset = options.reset;
    this.onError = options.onError;
    this.validationCallback = options.validate;

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

  validate(): boolean {
    if (this.validationCallback) {
      const result = this.validationCallback(this.getValue());

      if (result) {
        this.onError(result);
        return false;
      }
    }

    return true;
  }

  reset() {
    this.runReset();

    if (this.onError) {
      this.onError(undefined);
    }
  }
}
