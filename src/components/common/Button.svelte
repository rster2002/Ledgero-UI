<svelte:element
  this={href === '' ? 'button' : 'a'}
  class="
      button
      {icon && 'icon'}
      {elevated && 'elevated'}
      {tonal && 'tonal'}
      {outline && 'outline'}
      {text && 'text'}
      {disabled && 'disabled'}
    "
  on:click
  bind:this={el}
  {disabled}
  {href}
>
  <slot />
</svelte:element>

<script lang="ts">
// Imports
import { onMount } from "svelte";

// Props
export var icon = false;
export var elevated = false;
export var tonal = false;
export var outline = false;
export var text = false;
export var disabled = false;

export var href: string = "";

// Data
let el: HTMLButtonElement;

onMount(() => {
    let style = getComputedStyle(el);
    el.style.minWidth = style.width;
    el.style.minHeight = style.height;
});
</script>

<style lang="scss">
@use "../../scss/dp";
@use "../../scss/typescale";
@use "../../scss/state-layer";
@use "../../scss/color";

.button {
    height: dp.dp(40);
    padding: 0 dp.dp(24);

    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: dp.dp(8);
    white-space: nowrap;

    text-decoration: none;
    border-radius: var(--md-sys-shape-corner-full);
    background-color: color.use(--md-sys-color-primary);
    color: color.use(--md-sys-color-on-primary);
    border: 0;
    cursor: pointer;
    transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard) all;
    transition-property: color, background-color;
    -webkit-user-select: none;
    user-select: none;

    @include typescale.use-scale(label-large);

    --spinner-color: color.use(--md-sys-color-on-primary);

    &.icon {
        padding-left: dp.dp(16);
    }

    &.elevated {
        background-color: color.use(--md-sys-color-surface-container-low);
        box-shadow: var(--md-sys-elevation-level1);
        color: color.use(--md-sys-color-primary);
    }

    &.tonal {
        background-color: color.use(--md-sys-color-secondary-container);
        color: color.use(--md-sys-color-on-secondary-container);
    }

    &.outline {
        background-color: transparent;
        color: color.use(--md-sys-color-primary);
        border: dp.dp(1) solid color.use(--md-sys-color-outline);
    }

    &.text {
        background-color: transparent;
        color: color.use(--md-sys-color-primary);
    }

    &:disabled, &.disabled {
        pointer-events: none;

        background-color: color.use(--md-sys-color-on-surface, 0.12);
        color: color.use(--md-sys-color-on-surface, 0.38);
        cursor: default;
        box-shadow: none;

        &.outline {
            border-color: color.use(--md-sys-color-outline, 0.12);
            background-color: transparent;
        }

        &.text {
            background-color: transparent;
        }
    }

    &:hover:not(:disabled) {
        background-color: state-layer.hover-state-layer(--md-sys-color-primary, --md-sys-color-on-primary);
        box-shadow: var(--md-sys-elevation-level1);

        &.elevated {
            background-color: state-layer.hover-state-layer(--md-sys-color-surface-container-low, --md-sys-color-primary);
        }

        &.tonal {
            background-color: state-layer.hover-state-layer(--md-sys-color-secondary-container, --md-sys-color-on-secondary-container);
        }

        &.outline, &.text {
            background-color: color.use(--md-sys-color-primary, 0.08);
            box-shadow: none;
        }
    }

    :global(svg) {
        font-size: dp.dp(18);
    }
}

</style>
