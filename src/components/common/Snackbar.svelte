{#if open}
  <div class="snackbar" in:fly={{ y: 100, duration: 250 }} out:fly={{ y: 100, duration: 250 }}>
    <slot />

    <button on:click={close}>
      <CloseIcon />
    </button>
  </div>
{/if}

<script lang="ts">
// Import
import { fly } from "svelte/transition";

// Components
import CloseIcon from "@/components/icons/CloseIcon.svelte";

// Props
export var open: boolean;
export var timeout = 3500;

// Data
let timer: number = 0;

// Computed
$: {
    if (timer !== 0) {
        clearTimeout(timer);
    }

    if (open) {
        timer = setTimeout(() => {
            open = false;
        }, timeout);
    }
}

// Functions
function close() {
    console.log(open);
    open = false;
}
</script>

<style lang="scss">
.snackbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    position: fixed;
    padding: 1em;
    bottom: 2em;
    right: 1em;
    z-index: 16;

    background-color: var(--snackbar-background, var(--background));
    border: 2px solid var(--snackbar-primary, var(--primary-color));
    border-radius: var(--border-radius-medium);
    color: var(--snackbar-primary, var(--primary-color));

    button {
        position: relative;
        top: 0.1em;
        padding: 0;

        color: inherit;
        background-color: transparent;
        border: 0;
        font-size: 1.3em;
        cursor: pointer;
    }
}

.popout-enter-active {
    transition: 200ms bottom var(--decelerated-easing);
}

.popout-leave-active {
    transition: 150ms bottom var(--accelerated-easing);
}

.popout-leave-to,
.popout-enter-from {
    bottom: -3em;
}

.popout-enter-to,
.popout-leave-from {
    bottom: 2em;
}
</style>
