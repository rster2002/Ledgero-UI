<section>
  <div class="icon {center && 'center'}">
    <slot name="icon" />
  </div>
  <div class="options">
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
        padding: 0 1em;
        box-sizing: border-box;

        &.center {
            display: grid;
            place-items: center;
        }
    }

    .options {
        width: 100%;
    }
}

</style>
