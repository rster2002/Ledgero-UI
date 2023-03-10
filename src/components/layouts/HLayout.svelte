<div class="{right && 'right'}">
    <slot />
</div>

<script lang="ts">
// Props
export var right = false;
</script>

<style lang="scss">

div {
    display: flex;
    flex-direction: row;
    gap: 1em;

    &.right {
        justify-content: right;
    }
}

</style>
