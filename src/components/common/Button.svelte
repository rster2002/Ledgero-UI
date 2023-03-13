<button class="{secondary && 'secondary'}" on:click bind:this={el}>
    <slot />
</button>

<script lang="ts">
// Imports
import { onMount } from "svelte";

// Props
export var secondary = false;

// Data
let el: HTMLButtonElement;

onMount(() => {
    let style = getComputedStyle(el);
    el.style.minWidth = style.width;
    el.style.minHeight = style.height;
});
</script>

<style lang="scss">

button {
    padding: 0.75em 2em;

    border-radius: 0.5em;
    background-color: var(--accent-color);
    color: var(--text-on-accent);
    font-weight: 700;
    font-size: 0.8em;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 150ms var(--standard-easing);
    transition-property: color, background-color;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-family: var(--font-family);

    --spinner-color: var(--text-on-accent);

    &.secondary {
        background-color: transparent;
        color: var(--accent-color);
    }

    &:hover {
        background-color: var(--tint-50);
        color: var(--accent-color);

        --spinner-color: var(--accent-color);
    }

    :global(svg) {
        font-size: 1.4em;
    }

    &.warning {
        --accent-color: var(--error-color);
    }
}

</style>
