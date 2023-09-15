<slot />

<script lang="ts">
// Imports
import { setContext, createEventDispatcher } from "svelte";
import FormContext from "@/components/common/Form/FormContext";
const dispatch = createEventDispatcher();

// Data
const context = new FormContext({
  onSubmitCallback(result) {
    dispatch("submit", result);
  },
  onCancelCallback() {
    dispatch("cancel");
  },
});
setContext("form", context);
</script>
