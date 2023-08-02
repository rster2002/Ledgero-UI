<svelte:element
        this={href === '' ? 'div' : 'a'}
        class="
    target
    {disabled && 'disabled'}
  "
        {href}
        on:click={onClick}
>
  <svelte:element
          this={href === '' ? 'button' : 'div'}
          class="
      button
      {toggleable && 'toggleable'}
      {filled && 'filled'}
      {tonal && 'tonal'}
      {outline && 'outline'}
      {selected && 'selected'}
      {disabled && 'disabled'}
    "
          {disabled}
  >
    {#if !toggleable || !selected}
      <slot />
    {:else}
      <slot name="selected-icon">
        <slot />
      </slot>
    {/if}
  </svelte:element>
</svelte:element>

<!--<div >-->
<!--  <button-->

<!--  >-->

<!--  </button>-->
<!--</div>-->

<script lang="ts">
  // Imports
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Props
  export var href = "";
  export var selected: boolean | null = null;
  export var disabled: boolean = false;
  export var filled: boolean = false;
  export var tonal: boolean = false;
  export var outline: boolean = false;

  // Computed
  $: toggleable = selected !== null;

  // Functions
  function onClick() {
    if (disabled) {
      return;
    }

    if (toggleable && href === "") {
      selected = !selected;
    }

    dispatch("click");
  }
</script>

<style lang="scss">
  @use "../../scss/dp";
  @use "../../scss/color";
  @use "../../scss/state-layer";

  .target {
    height: dp.dp(48);
    width: dp.dp(48);

    display: grid;
    place-items: center;

    &.disabled {
      pointer-events: none;
    }

    .button {
      height: dp.dp(40);
      width: dp.dp(40);

      display: grid;
      place-items: center;
      cursor: pointer;

      background-color: transparent;
      border: 0;
      border-radius: var(--md-sys-shape-corner-full);
      color: color.use(--md-sys-color-on-surface-variant);
      transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard) all;

      :global(svg) {
        height: dp.dp(24);
        width: dp.dp(24);
      }

      &:hover {
        background-color: color.use(--md-sys-color-on-surface-variant, 0.08);
      }

      &.selected {
        color: color.use(--md-sys-color-primary);

        &:hover {
          background-color: color.use(--md-sys-color-primary, 0.08);
        }
      }

      &:disabled, &.disabled {
        cursor: default;
        color: color.use(--md-sys-color-on-surface, 0.38);

        &:hover {
          background-color: transparent;
        }
      }

      &.filled {
        background-color: color.use(--md-sys-color-primary);
        color: color.use(--md-sys-color-on-primary);

        &:hover {
          background-color: state-layer.hover-state-layer(--md-sys-color-primary, --md-sys-color-on-primary);
        }

        &.toggleable:not(.selected) {
          color: color.use(--md-sys-color-primary);
          background-color: color.use(--md-sys-color-surface-container-highest);

          &:hover:not(:disabled) {
            background-color: state-layer.hover-state-layer(--md-sys-color-surface-container-highest, --md-sys-color-primary);
          }

          &:disabled, &.disabled {
            color: color.use(--md-sys-color-on-surface, 0.38);
          }
        }

        &:disabled, &.disabled {
          background-color: color.use(--md-sys-color-on-surface, 0.12);
          color: color.use(--md-sys-color-on-surface, 0.38);
        }
      }

      &.tonal {
        color: color.use(--md-sys-color-on-secondary-container);
        background-color: color.use(--md-sys-color-secondary-container);

        &:hover {
          background-color: state-layer.hover-state-layer(--md-sys-color-secondary-container, --md-sys-color-on-secondary-container);
        }

        &.toggleable {
          &.selected {
            color: color.use(--md-sys-color-on-primary);
            background-color: color.use(--md-sys-color-primary);

            &:disabled, &.disabled {
              background-color: color.use(--md-sys-color-on-surface, 0.12);
              color: color.use(--md-sys-color-on-surface, 0.38);
            }
          }

          &:not(.selected) {
            color: color.use(--md-sys-color-primary);
            background-color: color.use(--md-sys-color-surface-container-highest);

            &:hover:not(:disabled) {
              background-color: state-layer.hover-state-layer(--md-sys-color-surface-container-highest, --md-sys-color-on-surface-variant);
            }

            &:disabled, &.disabled {
              color: color.use(--md-sys-color-on-surface, 0.38);
            }
          }
        }

        &:disabled, &.disabled {
          background-color: color.use(--md-sys-color-on-surface, 0.12);
          color: color.use(--md-sys-color-on-surface, 0.38);
        }
      }

      &.outline {
        border: dp.dp(1) solid color.use(--md-sys-color-outline);

        &:disabled, &.disabled {
          border-color: color.use(--md-sys-color-on-surface, 0.12);
        }

        &.selected {
          color: color.use(--md-sys-color-on-inverse-surface);
          background-color: color.use(--md-sys-color-inverse-surface);
          border-color: transparent;

          &:disabled, &.disabled {
            background-color: color.use(--md-sys-color-on-surface, 0.12);
            color: color.use(--md-sys-color-on-surface, 0.38);
          }
        }
      }
    }
  }

</style>
