<Page>
  <PageHeader>
    <h1>
      <CategoriesIcon />
      Categories
    </h1>

    <p>
      Manage categories and get an overview of your current financial situation.
    </p>
  </PageHeader>

  <AsyncContent {promise}>
    <div class="grid">
      {#each categories as category}
        <CategoryGridItem {category} />
      {/each}

      <button on:click={() => newPopupOpen = true}>
        <span>
          <AddIcon />
          New category
        </span>
      </button>
    </div>
  </AsyncContent>
</Page>

<Popup bind:open={newPopupOpen}>
  <VLayout>
    <NewCategoryForm bind:value={newCategory} />

    <div>
      <AsyncButton asyncClick={createCategory}>
        Create category
      </AsyncButton>
    </div>
  </VLayout>
</Popup>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type NewCategoryDTO from "@/models/dto/categories/NewCategoryDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoriesService from "@/services/CategoriesService";

// Components
import Page from "@/components/Page.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
import Popup from "@/components/Popup.svelte";
import NewCategoryForm from "@/components/forms/NewCategoryForm.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import AsyncButton from "@/components/AsyncButton.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import AsyncContent from "@/components/AsyncContent.svelte";
import CategoryGridItem from "@/components/fragments/CategoryGridItem.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";

// Data
const categoriesService = new CategoriesService();
let successMessage = [""];
let errorMessage = [""];
let newPopupOpen = false;
let categories: CategoryDTO[] = [];
let promise: Promise<unknown>;
let newCategory: NewCategoryDTO = {
    name: "New category",
    description: "A brand new category",
    hexColor: "ffffff",
};

// Functions
async function refresh() {
    categories = await categoriesService.getAllCategories();
}

async function createCategory() {
    try {
        await categoriesService.createCategory(newCategory);
        successMessage = ["Category created"];
        newPopupOpen = false;
        await refresh();
    } catch (e) {
        errorMessage = ["Failed to create category"];
    }
}

promise = refresh();
</script>

<style lang="scss">

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
    grid-gap: 2em;
    justify-content: center;

    button {
        min-height: 200px;

        background-color: transparent;
        border: 2px solid var(--accent-color);
        border-radius: var(--border-radius-medium);
        color: var(--accent-color);
        font-family: var(--header-face);
        cursor: pointer;
        transition: 150ms all var(--standard-easing);

        span {
            font-size: 1.5em;
        }

        &:hover {
            background-color: var(--accent-color);
            color: var(--text-on-accent);
        }
    }
}

</style>
