<td>
  <div>
    <slot />
  </div>
</td>

<style lang="scss">
td {
    padding: 1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    div {
        display: grid;
        place-items: center;
    }
}
</style>
