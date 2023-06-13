<div class="card {minimal && 'minimal'} {disappearCompact && 'disappearCompact'}">
    <slot />
</div>

<script lang="ts">
// Props
export var minimal = false;
export var disappearCompact = false;
</script>

<style lang="scss">
@import "../../shared";

.card {
    padding: 2em;
    box-sizing: border-box;

    background-color: var(--md-sys-color-surface-container-low);
    color: var(--md-sys-color-on-surface);
    filter: drop-shadow(0 0 9px rgba(0, 0, 0, 0.1));
    //box-shadow: 0 0 9px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius-medium);

    &.minimal {
        padding: 0;
    }
}

@media only screen and (max-width: $compact-breakpoint){
    .card.disappearCompact {
        background-color: transparent;
        filter: none;
    }
}

</style>
