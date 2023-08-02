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
@use "../../scss/dp";
@use "../../scss/color";
@use "../../scss/typescale";
@use "../../scss/breakpoints";

.scrim {
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    padding: dp.dp(56);
    box-sizing: border-box;

    background-color: color.use(--md-sys-scrim, 0.2);
}

.modal {
    min-width: dp.dp(240);
    max-width: dp.dp(560);

    padding: dp.dp(24);
    border-radius: dp.dp(28);
    box-sizing: border-box;

    background-color: color.use(--md-sys-color-surface-container-high);
    color: color.use(--md-sys-color-on-surface-variant);

    @include typescale.use-scale(body-medium);

    .defaultHeader {
        margin-bottom: dp.dp(16);

        .fullScreenActions {
            display: none;
        }

        & > :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
            margin: 0;

            color: color.use(--md-sys-color-on-surface);

            @include typescale.use-scale(headline-small);
        }
    }

    .content {
        background-color: inherit;
    }

    .fullScreenHeader {
        height: dp.dp(56);

        display: none;
        align-items: center;
        justify-content: space-between;

        .headerContent {
            display: flex;
            flex-direction: row;
            align-items: center;

            button {
                background-color: transparent;
                padding: 0 dp.dp(16);
                margin: 0;
                outline: 0;
                border: 0;

                :global(svg) {
                    color: color.use(--md-sys-color-on-surface);
                    font-size: dp.dp(24);
                }
            }
        }

        .fullScreenActions {
            display: flex;
            flex-direction: row;
        }

        & > :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
            margin: 0;

            color: color.use(--md-sys-color-on-surface);
            @include typescale.use-scale(headline-small);
        }
    }

    footer {
        margin-top: dp(24);

        display: flex;
        flex-direction: row;
        justify-content: end;
    }
}

@media only screen and (max-width: breakpoints.$compact-breakpoint){
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
                padding: dp.dp(24);
                box-sizing: border-box;
            }

            footer {
                display: none;
            }
        }
    }
}



</style>
