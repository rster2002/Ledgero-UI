<div class="gridLayout {wide && 'wide'}">
  <slot />
</div>

<script lang="ts">
// Props
export var wide: boolean = false;
</script>

<style lang="scss">
@use "../../scss/dp";

.gridLayout {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: dp.dp(16);

    background-color: inherit;

    &.wide {
        width: 100%;
    }

    & > :global(div) {
        background-color: inherit;
    }

    & > :global(.span2) {
        grid-column: span 2;
    }

    & > :global(.span6) {
        grid-column: span 6;
    }

    & > :global(.span12) {
        grid-column: span 12;
    }
}

</style>
