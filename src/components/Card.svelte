<div class="card {minimal && 'minimal'}">
    <slot />
</div>

<script lang="ts">
// Props
export var minimal: boolean = false;
</script>

<style lang="scss">

.card {
    padding: 2em;
    box-sizing: border-box;

    background-color: var(--background);
    //box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius-medium);

    &.minimal {
        padding: 0;
    }
}

</style>
