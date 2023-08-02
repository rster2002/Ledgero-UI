<div class="{right && 'right'} {full && 'full'} {wrap && 'wrap'}">
    <slot />
</div>

<script lang="ts">
// Props
export var right = false;
export var full = false;
export var wrap = false;
</script>

<style lang="scss">

div {
    display: flex;
    flex-direction: row;
    gap: 1em;

    background-color: inherit;

    &.right {
        justify-content: right;
    }

    &.full > :global(*) {
        width: 100%;
    }

    &.wrap {
        flex-wrap: wrap;
    }
}

</style>
