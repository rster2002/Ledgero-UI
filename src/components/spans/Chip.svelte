<span
  class="chip"
  style="border-color: {borderColor}; --light-color: {lightBackgroundColor}; --light-front: {lightForegroundColor}; --dark-color: {darkBackgroundColor}; --dark-front: {darkForegroundColor}"
  on:click
>
  <slot />
</span>

<script lang="ts">
// Imports
import { lighten } from "@/utils/textForBackground";

// Props
export var color: string;

// Computed
$: borderColor = color ? `#${color}` : "var(--md-sys-color-outline)";
$: lightBackgroundColor = lighten(color ?? "ffffff", 0.85);
$: lightForegroundColor = "var(--md-ref-palette-neutral20)";
$: darkBackgroundColor = color ? lighten(color, 0.5) : "var(--md-sys-color-surface-variant)";
$: darkForegroundColor = color ? "#000000" : "var(--md-ref-palette-neutral90)";
</script>

<style lang="scss">
@use "../../scss/typescale";
@use "../../scss/dp";
//@import "../../shared";

.chip {
    display: inline-flex;
    flex-direction: row;
    gap: dp.dp(8);
    align-items: center;
    position: relative;
    padding: dp.dp(4) dp.dp(8);

    color: var(--light-front);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: dp.dp(8);
    border: dp.dp(1) solid var(--md-sys-color-outline);
    background-color: var(--light-color, #f1f1f1);

    @include typescale.use-scale(label-large);

    &.navigationEnabled {
        cursor: inherit;
    }

    &.navigation {
        cursor: pointer;
    }

    span {
        height: dp.dp(16);
        width: dp.dp(16);

        display: inline-block;

        border-radius: var(--md-sys-shape-corner-full);
    }
}

:global(main.dark) .chip {
    color: var(--dark-front);
    background-color: var(--dark-color, #CAA6A6);
}

</style>
