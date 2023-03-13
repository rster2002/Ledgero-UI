<div
  class="amountGridItem"
  use:action
  style="background-color: #{item.hexColor}; color: #{textColor};"
  on:click
>
  <TopBottomLayout>
    <VLayout>
      <div class="expandIcon">
        <div>
          <ExpandIcon />
        </div>
      </div>

      <h2>{item.name}</h2>

      <p>{item.description}</p>
    </VLayout>

    <h2 slot="bottom">
      <AmountSpan amount={item.amount} background />
    </h2>
  </TopBottomLayout>
</div>

<script lang="ts">
// Imports
import textColorBasedOnHex from "@/utils/textForBackground";

// Components
import AmountSpan from "@/components/AmountSpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import ExpandIcon from "@/components/icons/ExpandIcon.svelte";
import { push } from "svelte-spa-router";
import TopBottomLayout from "@/components/layouts/TopBottomLayout.svelte";

// Props
interface GridItemContent {
    name: string;
    description: string;
    hexColor: string;
    amount: number;
}

export var item: GridItemContent;
export var action: any = () => {};

// Computed
$: textColor = textColorBasedOnHex(item.hexColor);
</script>

<style lang="scss">

.amountGridItem {
    padding: 2em;
    position: relative;

    border-radius: var(--border-radius-medium);
    cursor: pointer;

    .expandIcon {
        position: absolute;
        top: 2em;
        right: 2em;

        div {
            font-size: 1.35em;
        }
    }

    h2 {
        margin: 0;
    }
}

</style>
