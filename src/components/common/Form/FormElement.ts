import { getContext, setContext, onMount } from "svelte";
import type FormContext from "@/components/common/Form/FormContext";

export default abstract class FormElement {
  private parent: FormContext | null;

  protected constructor() {
    const context = getContext<FormContext>("form");

    if (context) {
      context.registerElement(this);
      setContext("form", undefined);

      onMount(() => {
        return () => context.unregisterElement(this);
      });
    }
  }

  setParent(form: FormContext | null) {
    this.parent = form;
  }

  getParent(): FormContext | null {
    return this.parent;
  }

  requireParent(): FormContext {
    if (this.getParent() === null) {
      throw new Error();
    }

    return this.parent;
  }
}
