<slot />

<script lang="ts">
// Imports
import { setContext, createEventDispatcher } from "svelte";
import FormContext from "@/components/common/Form/FormContext";
const dispatch = createEventDispatcher();

// Props
export var asyncSubmit: (result: { detail: unknown }) => Promise<unknown> | undefined;

// Data
const context = new FormContext({
  async onSubmitCallback(result) {
    dispatch("submit", result);

    if (asyncSubmit) {
      await asyncSubmit({ detail: result });
    }
  },
  onCancelCallback() {
    dispatch("cancel");
  },
});
setContext("form", context);
</script>
