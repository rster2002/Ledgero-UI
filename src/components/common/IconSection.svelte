<section>
  <div class="icon {center && 'center'}">
    <slot name="icon" />
  </div>
  <div class="routeWrapper">
    <slot />
  </div>
</section>

<script lang="ts">
// Props
export var center = false;
</script>

<style lang="scss">

section {
    display: flex;
    flex-direction: row;

    .icon {
        padding: 0 1em 0 0;
        box-sizing: border-box;

        &.center {
            display: grid;
            place-items: center;
        }
    }

    .routeWrapper {
        width: 100%;
    }
}

</style>
