<OptionsContainer bind:root={rootEl}>
  <slot />
</OptionsContainer>

<script lang="ts">
// Imports
import { onMount } from "svelte";
import { onSelectSymbol } from "@/components/common/Select/sharedSymbols";

// Components
import OptionsContainer from "@/components/common/Select/OptionsContainer.svelte"

// Data
let rootEl: HTMLElement;

// Functions
function onSelect(value: unknown[]) {
    rootEl.parentElement[onSelectSymbol]?.(value);
}

// Lifecycle
onMount(() => {
    rootEl[onSelectSymbol] = onSelect;
});
</script>
