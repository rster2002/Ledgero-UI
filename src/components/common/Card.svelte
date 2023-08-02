<section class="card {min && 'min'} {noOverflow && 'noOverflow'} {noPadding && 'noPadding'}]">
  <slot />
</section>

<script lang="ts">
// Props
export var min: boolean = false;
export var noOverflow: boolean = false;
export var noPadding: boolean = false;
</script>

<style lang="scss">
@use "../../scss/color";
@use "../../scss/dp";
@use "../../scss/typescale";

.card {
    padding: dp.dp(24);
    box-sizing: border-box;

    background-color: color.use(--md-sys-color-surface-container-low);
    color: color.use(--md-sys-color-on-surface);
    filter: drop-shadow(0 0 9px rgba(0, 0, 0, 0.1));
    border-radius: dp.dp(12);

    &:not(.min) {
        height: 100%;
        width: 100%;
    }

    &:not(.noOverflow) {
        overflow-y: auto;
    }

    &.noPadding {
        padding: 0;
    }

    & > :global(:is(h1, h2):first-child) {
        margin-top: dp.dp(4);

        @include typescale.use-scale(headline-large);
    }

    & > p {
        @include typescale.use-scale(body-medium);
    }
}
</style>
