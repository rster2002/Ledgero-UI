<slot />

<script lang="ts">
// Imports
import { setContext } from "svelte";
import FormContext from "@/components/common/Form/FormContext";

// Data
const context = new FormContext();
setContext("form", context);
</script>
