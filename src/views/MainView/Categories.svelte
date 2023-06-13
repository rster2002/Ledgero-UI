<Page>
  <PageHeader>
    <h1>
      <CategoriesIcon />
      Categories
    </h1>

    <p>
      Manage categories and get an overview of your current financial situation.
    </p>

    <div class="buttons" slot="right">
      {#if orderChanged}
        <AsyncButton asyncClick={saveOrdering}>
          <SaveIcon />
          Save ordering
        </AsyncButton>
      {/if}
    </div>
  </PageHeader>

  <AsyncContent {promise}>
    <div class="grid">
      <DragAndDropSort items={categories} let:item let:drag on:change={() => orderChanged = true}>
        <AmountGridItem
          action={drag}
          on:click={() => push(`/categories/${item.id}`)}
          item={{
            name: item.name,
            description: item.description,
            hexColor: item.hexColor,
            amount: item.amount
          }}
        />
      </DragAndDropSort>

      <GridNewButton on:click={() => newPopupOpen = true}>
        <AddIcon />
        New category
      </GridNewButton>
    </div>
  </AsyncContent>
</Page>

<!--<Popup bind:open={newPopupOpen}>-->
<!--  <VLayout>-->
<!--    <NewCategoryForm bind:value={newCategory} />-->

<!--    <div>-->
<!--      <AsyncButton asyncClick={createCategory}>-->
<!--        Create category-->
<!--      </AsyncButton>-->
<!--    </div>-->
<!--  </VLayout>-->
<!--</Popup>-->

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoryService from "@/services/CategoryService";

// Components
import Page from "@/components/Page.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
// import Popup from "@/components/common/Popup.svelte";
import NewCategoryForm from "@/components/forms/CategoryDetailsForm.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";
import DragAndDropSort from "@/components/DragAndDropSort.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import AmountGridItem from "@/components/fragments/AmountGridItem.svelte";
import { push } from "svelte-spa-router";
import GridNewButton from "@/components/fragments/GridNewButton.svelte";

// Data
const categoriesService = new CategoryService();
let orderChanged = false;
let successMessage = [""];
let errorMessage = [""];
let newPopupOpen = false;
let categories: CategoryDTO[] = [];
let promise: Promise<unknown>;
let newCategory: CategoryDetailsDTO = {
    name: "New category",
    description: "A brand new category",
    hexColor: "ffffff",
};

// Functions
async function refresh() {
    categories = await categoriesService.getAllCategories();
}

async function saveOrdering() {
    try {
        await categoriesService.saveOrdering(categories.map(i => i.id));
        orderChanged = false;
        successMessage = ["Ordering saved"];
    } catch (e) {
        errorMessage = ["Failed to save ordering"];
    }
}

async function createCategory() {
    try {
        await categoriesService.createCategory(newCategory);
        successMessage = ["Category created"];
        newPopupOpen = false;
        await refresh();
        newCategory = {
            name: "New category",
            description: "A brand new category",
            hexColor: "ffffff",
        };
    } catch (e) {
        errorMessage = ["Failed to create category"];
    }
}

promise = refresh();
</script>

<style lang="scss">

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 2em;
    justify-content: center;
}

</style>
