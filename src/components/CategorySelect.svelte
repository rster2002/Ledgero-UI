<InputWrapper {label} on:click={() => popupOpen = true} padding pointer>
  <AsyncContent {promise}>
    {#if subcategoryId === null}
      <CategorySpan category={selectedCategory} />
    {:else}
      <SubcategorySpan subcategory={selectedSubcategory} />
    {/if}
  </AsyncContent>
</InputWrapper>

<Popup bind:open={popupOpen} min>
  <div class="popupWrapper">
    <VLayout>
      <Button on:click={() => popupOpen = false}>
        Done
      </Button>

      <Divider label={currentCategoryLabel} />

      {#if categoryId !== null}
        <div class="gridSelect">
          <div
            class="categoryOption noHover"
            style="background-color: #{selectedCategory.hexColor}; color: #{textForBackground(selectedCategory.hexColor)};"
          >
            <span>
              <CategoryIcon />
              {selectedCategory.name}
            </span>

            <span role="button" on:click={unsetCategory}>
              <CloseIcon />
            </span>
          </div>

          {#if subcategoryId !== null}
            <div
              class="categoryOption noHover"
              style="background-color: #{selectedSubcategory.hexColor}; color: #{textForBackground(selectedSubcategory.hexColor)};"
            >
              <span>
                <SubcategoryIcon />
                {selectedSubcategory.name}
              </span>

              <HLayout>
                <span role="button" on:click={() => subcategoryId = null}>
              <CloseIcon />
            </span>
              </HLayout>
            </div>
          {/if}
        </div>
      {:else}
        <div
          class="categoryOption noHover"
          style="background-color: #f1f1f1; color: #000000;"
        >
          <span>No category</span>
        </div>
      {/if}

      {#if categoryId === null}
        <Divider label="Select category:" />

        <div class="gridSelect">
          {#each categories as category}
            <div
              on:click={() => categoryId = category.id}
              class="categoryOption"
              style="background-color: #{category.hexColor}; color: #{textForBackground(category.hexColor)};"
            >
              <span>{category.name}</span>
              <AmountSpan amount={category.amount} background />
            </div>
          {/each}
        </div>
      {/if}

      {#if categoryId !== null && subcategoryId === null}
        <Divider label="Select subcategory:" />

        <AsyncContent promise={subcategoriesPromise}>
          {#each subcategories as subcategory}
            <div
              on:click={() => subcategoryId = subcategory.id}
              class="categoryOption"
              style="background-color: #{subcategory.hexColor}; color: #{textForBackground(subcategory.hexColor)};"
            >
              <span>{subcategory.name}</span>
              <AmountSpan amount={subcategory.amount} background />
            </div>
          {:else}
            No subcategories
          {/each}
        </AsyncContent>
      {/if}
    </VLayout>
  </div>
</Popup>

<script lang="ts">
// Imports
import textForBackground from "@/utils/textForBackground";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";
import CategoryService from "@/services/CategoryService";

// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import Popup from "@/components/common/Popup.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import Button from "@/components/common/Button.svelte";
import CloseIcon from "@/components/icons/CloseIcon.svelte";
import Divider from "@/components/common/Divider.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import SubcategoryIcon from "@/components/icons/SubcategoryIcon.svelte";
import SubcategorySpan from "@/components/spans/SubcategorySpan.svelte";

// Props
export var categoryId: string | null = null;
export var subcategoryId: string | null = null;
export var label: string = "Category";

// Data
const categoryService = new CategoryService();
let promise: Promise<void>;
let subcategoriesPromise: Promise<void>;
let popupOpen = false;
let categories: CategoryDTO[] = [];
let subcategories: SubcategoryDTO[] = [];

// Computed
$: selectedCategory = categories.find(category => category.id === categoryId);
$: selectedSubcategory = subcategories.find(subcategory => subcategory.id === subcategoryId);
$: subcategoriesPromise = refreshSubcategories(categoryId);
$: currentCategoryLabel = createCurrentCategoryLabel(categoryId, subcategoryId);

// Functions
async function refresh() {
    categories = await categoryService.getAllCategories();
}

async function refreshSubcategories(categoryId: string) {
    subcategories = await categoryService.getSubcategories(categoryId);
}

function unsetCategory() {
    categoryId = null;
    subcategoryId = null;
}

function createCurrentCategoryLabel(categoryId: string | null, subcategoryId: string | null): string {
    if (subcategoryId !== null) {
        return "Current category & subcategory:";
    }

    return "Current category:";
}

promise = refresh();
</script>

<style lang="scss">

.popupWrapper {
    width: 450px;
}

.gridSelect {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1em;
}

.categoryOption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;

    border-radius: var(--border-radius-small);
    font-weight: 700;

    &:not(.noHover) {
        cursor: pointer;

        &:hover {
            outline-offset: 0.15em;
            outline: 0.15em solid var(--tint-500);
        }
    }

    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &[role=button] {
            cursor: pointer;
        }
    }
}

</style>
