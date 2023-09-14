import type FormElement from "@/components/common/Form/FormElement";

export default class FormContext {
  private readonly elements: FormElement[] = [];

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
}
