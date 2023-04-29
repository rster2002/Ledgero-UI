{#if open}
  <div class="scim" on:click|self={close} use:inject>
    <div class="popup {min && 'min'} {noPadding && 'noPadding'}">
<!--      <button on:click={close}><span class="mdi mdi-close"></span></button>-->
      <slot />
    </div>
  </div>
{/if}

<script lang="ts">
// Imports
import inject from "svelte-inject";

// Data
export var open: boolean = false;
export var min: boolean = false;
export var noPadding: boolean = false;

// Functions
function close() {
    open = false;
}
</script>

<style lang="scss">

.scim {
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;

    animation: scim-in forwards 250ms var(--standard-easing);

    .popup {
        max-height: 80%;
        width: 95%;
        max-width: 500px;

        position: relative;
        padding: 32px;
        top: -25%;
        overflow-y: auto;
        overflow-x: hidden;

        background-color: var(--background);
        border-radius: var(--border-radius-medium);

        animation: box-in forwards 250ms var(--standard-easing);

        &.noPadding {
            padding: 0;
        }

        button {
            position: absolute;
            top: 32px + 16px;
            right: 16px;

            display: none;
            padding: 0;
            margin: 0;

            font-size: 24px;
            background-color: transparent;
            border: 0;
            color: #ffffff;
            mix-blend-mode: difference;
        }

        &.min {
            width: unset;
            display: inline-block;

            button {
                top: 16px;
            }
        }
    }
}

@keyframes scim-in {
    from {
        backdrop-filter: blur(0px);
        background-color: transparent;
    }

    to {
        backdrop-filter: blur(2px);
        background-color: #f0f0f0ba;
    }
}

@keyframes box-in {
    from {
        transform: translateY(1em);
        opacity: 0;
    }

    to {
        transform: translateY(0em);
        opacity: 1;
    }
}

@media only screen and (max-width: 600px) {
    .scim .popup {
        max-width: unset;
        width: 100%;

        &:not(.min) {
            max-height: unset;
            height: 100%;
        }

        &.min {
            width: 95%;
        }

        button {
            display: block;
        }
    }
}

</style>
