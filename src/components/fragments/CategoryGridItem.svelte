<div class="categoryGridItem" use:action style="background-color: #{category.hexColor}; color: #{textColor};" on:click={openCategory}>
  <TopBottomLayout>
    <VLayout>
      <div class="expandIcon">
        <div>
          <ExpandIcon />
        </div>
      </div>

      <h2>{category.name}</h2>

      <p>{category.description}</p>
    </VLayout>

    <h2 slot="bottom">
      <AmountSpan amount={category.amount} background />
    </h2>
  </TopBottomLayout>
</div>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import textColorBasedOnHex from "@/utils/textForBackground";

// Components
import AmountSpan from "@/components/AmountSpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import ExpandIcon from "@/components/icons/ExpandIcon.svelte";
import { push } from "svelte-spa-router";
import TopBottomLayout from "@/components/layouts/TopBottomLayout.svelte";

// Props
export var category: CategoryDTO;
export var action: any = () => {};

// Computed
$: textColor = textColorBasedOnHex(category.hexColor);

// Functions
function openCategory() {
    push("/categories/" + category.id);
}
</script>

<style lang="scss">

.categoryGridItem {
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
