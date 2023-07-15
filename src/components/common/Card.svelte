<section class="card {min && 'min'} {noOverflow && 'noOverflow'}">
  <slot />
</section>

<script lang="ts">
// Props
export var min: boolean = false;
export var noOverflow: boolean = false;
</script>

<style lang="scss">
@use "../../scss/color";
@use "../../scss/dp";

.card {
    padding: dp.dp(16);
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
}
</style>
