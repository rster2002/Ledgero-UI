<div class="wrapper">
  <div class="categories">
    <Card>
      <VLayout>
        <header>
          <Button icon>
            <CategoryIcon />
            New category
          </Button>
        </header>

        <AsyncContent {promise}>
          {#each categories as category}
            <ListItem clickable on:click={() => openCategory(category)}>
              {category.name}

              <svelte:fragment slot="supporting">
                {category.description}
              </svelte:fragment>

              <AmountSpan slot="tailing" amount={category.amount} />
            </ListItem>
          {/each}
        </AsyncContent>
      </VLayout>
    </Card>
  </div>

  <div class="details">
    <InlinePage
      title="Category"
      open={openedCategory !== null}
      on:close={() => openedCategory = null}
    >
      <Router
        routes={{
          "/categories/:categoryId": ViewCategory,
        }}
      />
    </InlinePage>
  </div>
</div>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoryService from "@/services/CategoryService";

// Components
import Card from "@/components/common/Card.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import ListItem from "@/components/ListItem.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import Button from "@/components/common/Button.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import InlinePage from "@/components/InlinePage.svelte";
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import Router, { push } from "svelte-spa-router";
import ViewCategory from "@/views/MainView/Categories/ViewCategory.svelte";

// Data
const categoriesService = new CategoryService();
let categories: CategoryDTO[] = [];
let openedCategory: CategoryDTO | null = null;

// Functions
async function refresh() {
  categories = await categoriesService.getAllCategories();
}

function openCategory(category: CategoryDTO) {
  push(`/categories/${category.id}`);
}

const promise = refresh();
</script>

<style lang="scss">
@use "../../scss/dp";

.wrapper {
    height: 100%;
    width: 100%;

    container-type: inline-size;
    container-name: transactions;

    display: grid;
    grid-gap: dp.dp(24);
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100%;

    .categories  {
        height: 100%;

        grid-column: span 4;
    }

    .details  {
        grid-column: span 8;
    }

    :global(.card) {
        height: 100%;
        overflow-y: auto;
    }
}

.categories footer {
    display: grid;
    place-items: center;
    padding: dp.dp(16);
}

@container (width < 80rem) {
    .wrapper {
        .categories {
            grid-column: span 6;
        }

        .details {
            grid-column: span 6;
        }
    }
}

</style>


<!--<Page>-->
<!--  <PageHeader>-->
<!--    <h1>-->
<!--      <CategoriesIcon />-->
<!--      Categories-->
<!--    </h1>-->

<!--    <p>-->
<!--      Manage categories and get an overview of your current financial situation.-->
<!--    </p>-->

<!--    <div class="buttons" slot="right">-->
<!--      {#if orderChanged}-->
<!--        <AsyncButton asyncClick={saveOrdering}>-->
<!--          <SaveIcon />-->
<!--          Save ordering-->
<!--        </AsyncButton>-->
<!--      {/if}-->
<!--    </div>-->
<!--  </PageHeader>-->

<!--  <AsyncContent {promise}>-->
<!--    <div class="grid">-->
<!--      <DragAndDropSort items={categories} let:item let:drag on:change={() => orderChanged = true}>-->
<!--        <AmountGridItem-->
<!--          action={drag}-->
<!--          on:click={() => push(`/categories/${item.id}`)}-->
<!--          item={{-->
<!--            name: item.name,-->
<!--            description: item.description,-->
<!--            hexColor: item.hexColor,-->
<!--            amount: item.amount-->
<!--          }}-->
<!--        />-->
<!--      </DragAndDropSort>-->

<!--      <GridNewButton on:click={() => newPopupOpen = true}>-->
<!--        <AddIcon />-->
<!--        New category-->
<!--      </GridNewButton>-->
<!--    </div>-->
<!--  </AsyncContent>-->
<!--</Page>-->

<!--&lt;!&ndash;<Popup bind:open={newPopupOpen}>&ndash;&gt;-->
<!--&lt;!&ndash;  <VLayout>&ndash;&gt;-->
<!--&lt;!&ndash;    <NewCategoryForm bind:value={newCategory} />&ndash;&gt;-->

<!--&lt;!&ndash;    <div>&ndash;&gt;-->
<!--&lt;!&ndash;      <AsyncButton asyncClick={createCategory}>&ndash;&gt;-->
<!--&lt;!&ndash;        Create category&ndash;&gt;-->
<!--&lt;!&ndash;      </AsyncButton>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </VLayout>&ndash;&gt;-->
<!--&lt;!&ndash;</Popup>&ndash;&gt;-->

<!--<SuccessSnackbar message={successMessage} />-->
<!--<ErrorSnackbar message={errorMessage} />-->

<!--<script lang="ts">-->
<!--// Imports-->
<!--import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";-->
<!--import type CategoryDTO from "@/models/dto/categories/CategoryDTO";-->
<!--import CategoryService from "@/services/CategoryService";-->

<!--// Components-->
<!--import Page from "@/components/Page.svelte";-->
<!--import AddIcon from "@/components/icons/AddIcon.svelte";-->
<!--// import Popup from "@/components/common/Popup.svelte";-->
<!--import NewCategoryForm from "@/components/forms/CategoryDetailsForm.svelte";-->
<!--import VLayout from "@/components/layouts/VLayout.svelte";-->
<!--import AsyncButton from "@/components/common/AsyncButton.svelte";-->
<!--import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";-->
<!--import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";-->
<!--import AsyncContent from "@/components/common/AsyncContent.svelte";-->
<!--import PageHeader from "@/components/fragments/PageHeader.svelte";-->
<!--import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";-->
<!--import DragAndDropSort from "@/components/DragAndDropSort.svelte";-->
<!--import SaveIcon from "@/components/icons/SaveIcon.svelte";-->
<!--import AmountGridItem from "@/components/fragments/AmountGridItem.svelte";-->
<!--import { push } from "svelte-spa-router";-->
<!--import GridNewButton from "@/components/fragments/GridNewButton.svelte";-->

<!--// Data-->
<!--const categoriesService = new CategoryService();-->
<!--let orderChanged = false;-->
<!--let successMessage = [""];-->
<!--let errorMessage = [""];-->
<!--let newPopupOpen = false;-->
<!--let categories: CategoryDTO[] = [];-->
<!--let promise: Promise<unknown>;-->
<!--let newCategory: CategoryDetailsDTO = {-->
<!--    name: "New category",-->
<!--    description: "A brand new category",-->
<!--    hexColor: "ffffff",-->
<!--};-->

<!--// Functions-->
<!--async function refresh() {-->
<!--    categories = await categoriesService.getAllCategories();-->
<!--}-->

<!--async function saveOrdering() {-->
<!--    try {-->
<!--        await categoriesService.saveOrdering(categories.map(i => i.id));-->
<!--        orderChanged = false;-->
<!--        successMessage = ["Ordering saved"];-->
<!--    } catch (e) {-->
<!--        errorMessage = ["Failed to save ordering"];-->
<!--    }-->
<!--}-->

<!--async function createCategory() {-->
<!--    try {-->
<!--        await categoriesService.createCategory(newCategory);-->
<!--        successMessage = ["Category created"];-->
<!--        newPopupOpen = false;-->
<!--        await refresh();-->
<!--        newCategory = {-->
<!--            name: "New category",-->
<!--            description: "A brand new category",-->
<!--            hexColor: "ffffff",-->
<!--        };-->
<!--    } catch (e) {-->
<!--        errorMessage = ["Failed to create category"];-->
<!--    }-->
<!--}-->

<!--promise = refresh();-->
<!--</script>-->

<!--<style lang="scss">-->

<!--.grid {-->
<!--    display: grid;-->
<!--    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));-->
<!--    grid-gap: 2em;-->
<!--    justify-content: center;-->
<!--}-->

<!--</style>-->
