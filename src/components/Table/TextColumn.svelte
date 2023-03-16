<td class="{center && 'center'}">
  <slot />
</td>

<script lang="ts">
// Props
export var center = false;
</script>

<style lang="scss">
td {
    padding: 1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.center {
        text-align: center;
    }
}
</style>
