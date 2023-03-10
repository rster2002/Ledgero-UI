<div class="section {disabled && 'disabled'}">
  <slot />

  {#if disabled}
    <div class="overlay"></div>
  {/if}
</div>

<script lang="ts">
// Props
export var disabled: boolean = false;
</script>

<style lang="scss">

.section {
    position: relative;

    &.disabled {
        pointer-events: none;
        opacity: 0.7;
    }
}

.overlay {
    height: 100%;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 16;
}

</style>


