{#if open}
  <div class="scim" on:click|self={close}>
    <div class="popup {min && 'min'} {noPadding && 'noPadding'}">
<!--      <button on:click={close}><span class="mdi mdi-close"></span></button>-->
      <slot />
    </div>
  </div>
{/if}

<script lang="ts">
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
    z-index: 16;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--darkOpaqueScim);

    .popup {
        max-height: 80%;
        width: 95%;
        max-width: 915px;

        position: relative;
        padding: 32px;
        overflow-y: auto;
        overflow-x: hidden;

        background-color: var(--background);
        border-radius: var(--borderRadius);

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
