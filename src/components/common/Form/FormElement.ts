import { getContext, onMount } from "svelte";
import type FormContext from "@/components/common/Form/FormContext";

export default abstract class FormElement {
  private parent: FormContext | null;

  protected constructor() {
    const context = getContext<FormContext>("form");

    if (context) {
      onMount(() => {
        context.registerElement(this);
        return () => context.unregisterElement(this);
      });
    }
  }

  setParent(form: FormContext | null) {
    this.parent = form;
  }

  requireParent(): FormContext {
    if (this.parent === null) {
      throw new Error();
    }

    return this.parent;
  }
}
