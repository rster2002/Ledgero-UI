<th class="{wide && 'wide'}">
  <span>
    <slot />
  </span>
</th>

<script lang="ts">
// Props
export var wide = false;
</script>

<style lang="scss">

th {
    padding: 1em;

    text-transform: uppercase;
    font-weight: 700;
    color: var(--primary-color);

    span {
        font-size: 0.8em;
    }

    &.wide {
        width: 100%;
    }

    &:first-child {
        border-top-left-radius: inherit;
    }

    &:last-child {
        border-top-right-radius: inherit;
    }
}

</style>
