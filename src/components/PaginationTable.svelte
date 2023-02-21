<AsyncContent {promise}>
  <Table {items}>
    <svelte:fragment slot="header">
      <slot name="header" />
    </svelte:fragment>

    <svelte:fragment slot="row" let:item>
      <slot name="row" {item} />
    </svelte:fragment>

    <svelte:fragment slot="footer">
      <div class="buttons">
        {#if !done}
          <AsyncButton asyncClick={next}>
            Load more
          </AsyncButton>
        {/if}
      </div>
    </svelte:fragment>
  </Table>
</AsyncContent>

<script lang="ts">
// Components
import AsyncContent from "@/components/AsyncContent.svelte";
import Table from "@/components/Table.svelte";
import AsyncButton from "@/components/AsyncButton.svelte";

// Generic
type $$Generic = null;
type T = $$Generic;

// Props
export var paginator: AsyncIterator<T[]>;

// Data
let loading = false;
let done = false;
let items: T[] = [];

// Functions
async function next() {
    loading = true;
    let iteration = await paginator.next();

    done = !!iteration.done;

    console.log(iteration);

    for (let item of iteration.value) {
        items.push(<T>item);
    }

    items = items;
}

const promise = next();
</script>

<style lang="scss">

.buttons {
    width: 100%;

    display: grid;
    place-items: center;
}

</style>
