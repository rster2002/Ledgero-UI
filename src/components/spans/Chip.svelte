<span
  class="chip"
  style="border-color: #{color}; background-color: {backgroundColor};"
  on:click
>
  <slot />
</span>

<script lang="ts">
// Imports
import { lighten } from "@/utils/textForBackground";

// Props
export var color: string = "ffffff";

// Computed
$: backgroundColor = lighten(color, 0.85);
</script>

<style lang="scss">
@import "../../shared";

.chip {
    display: inline-flex;
    flex-direction: row;
    gap: dp(8);
    align-items: center;
    position: relative;
    padding: dp(4) dp(8);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: var(--header-face);
    border-radius: dp(8);
    border: dp(1) solid var(--md-sys-color-outline);
    background-color: #f1f1f1;

    &.navigationEnabled {
        cursor: inherit;
    }

    &.navigation {
        cursor: pointer;
    }

    span {
        height: dp(16);
        width: dp(16);

        display: inline-block;

        border-radius: var(--border-radius-full);
    }
}

</style>
