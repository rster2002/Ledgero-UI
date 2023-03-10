<Button on:click={click}>
    {#if !loading}
        <slot />
    {:else}
        <Spinner />
    {/if}
</Button>

<script lang="ts">
// Components
import Button from "@/components/common/Button.svelte";
import Spinner from "@/components/fragments/Spinner.svelte";

// Props
export var asyncClick: <T>() => Promise<T>;

// Data
let loading = false;

// Functions
function click() {
    loading = true;
    asyncClick()
        .finally(() => (loading = false));
}
</script>
