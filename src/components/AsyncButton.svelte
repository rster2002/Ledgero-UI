<Button on:click={click}>
    {#if !loading}
        <slot />
    {:else}
        <span class="spinner"></span>
    {/if}
</Button>

<script lang="ts">
// Components
import Button from "@/components/Button.svelte";

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

<style lang="scss">

.spinner {
    --size: 0.7em;
    width: var(--size);
    height: var(--size);

    display: inline-block;

    text-align: center;
    border: 2px solid transparent;
    border-top-color: inherit;
    border-radius: 1000px;
    animation: spinner 300ms infinite linear;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

</style>
