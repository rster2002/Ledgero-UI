{#if open}
  <div class="scrim {fullScreen && 'fullScreen'}" on:click|self={close} use:inject>
    <div class="modal">
      {#if $$slots.header}
        <header class="defaultHeader">
          <slot name="header" />
        </header>

        <header class="fullScreenHeader">
          <div class="headerContent">
            <button on:click={close}>
              <CloseIcon />
            </button>

            <slot name="header" />
          </div>

          <div class="fullScreenActions">
            <slot name="fullscreen-actions">
              <slot name="actions" />
            </slot>
          </div>
        </header>
      {/if}

      <div class="content">
        <slot />
      </div>

      {#if $$slots.actions}
        <footer>
          <slot name="actions" />
        </footer>
      {/if}
    </div>
  </div>
{/if}

<script lang="ts">
// Imports
import inject from "svelte-inject";
import CloseIcon from "@/components/icons/CloseIcon.svelte";

// Props
export var open = false;
export var fullScreen = false;

// Functions
function close() {
    open = false;
}
</script>

<style lang="scss">
@import "../../shared";

.scrim {
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    padding: dp(56);
    box-sizing: border-box;

    background-color: rgb(var(--md-sys-scrim-rgb) / 0.2);
}

.modal {
    min-width: dp(240);
    max-width: dp(560);

    padding: dp(24);
    border-radius: dp(28);
    box-sizing: border-box;

    background-color: var(--md-sys-color-surface-container-high);
    color: var(--md-sys-color-on-surface-variant);
    @include mdl-font(body-medium);

    .defaultHeader {
        margin-bottom: dp(16);

        .fullScreenActions {
            display: none;
        }

        & > :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
            margin: 0;

            color: var(--md-sys-color-on-surface);
            @include mdl-font(headline-small);
        }
    }

    .content {
        background-color: inherit;
    }

    .fullScreenHeader {
        height: dp(56);

        display: none;
        align-items: center;
        justify-content: space-between;

        .headerContent {
            display: flex;
            flex-direction: row;
            align-items: center;

            button {
                background-color: transparent;
                padding: 0 dp(16);
                margin: 0;
                outline: 0;
                border: 0;

                :global(svg) {
                    color: var(--md-sys-color-on-surface);
                    font-size: dp(24);
                }
            }
        }

        .fullScreenActions {
            display: flex;
            flex-direction: row;
        }

        & > :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
            margin: 0;

            color: var(--md-sys-color-on-surface);
            @include mdl-font(headline-small);
        }
    }

    footer {
        margin-top: dp(24);

        display: flex;
        flex-direction: row;
        justify-content: end;
    }
}

@media only screen and (max-width: $compact-breakpoint){
    .scrim.fullScreen {
        display: block;
        padding: 0;

        .modal {
            height: 100%;
            width: 100%;

            border-radius: 0;
            padding: 0;

            .defaultHeader {
                display: none;
            }

            .fullScreenHeader {
                display: flex;
            }

            .content {
                padding: dp(24);
                box-sizing: border-box;
            }

            footer {
                display: none;
            }
        }
    }
}



</style>
