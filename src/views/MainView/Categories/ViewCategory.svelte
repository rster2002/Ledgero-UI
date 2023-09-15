<AsyncContent {promise}>
  <div class="transactionView">
    <div class="grid">
      <Card outlineCompact>
        <VLayout>
          <header>
            <h2>
              <AmountSpan amount={category.amount} sign />
            </h2>
            <h3>
              {category.name}
            </h3>
          </header>

          <HLayout wrap>
            <Button on:click={() => editCategoryPopupOpen = true} icon outline>
              <EditIcon />
              Edit details
            </Button>

            <Button on:click={deleteCategory} icon text>
              <DeleteIcon />
              Delete category
            </Button>
          </HLayout>
        </VLayout>
      </Card>

      <div class="details">
        <Card outlineCompact>
          <VLayout>
            <!--          <CategoryDet {category} />-->

          </VLayout>
        </Card>
      </div>

      <div class="splits">
        <Card outlineCompact>
          <VLayout>
            <header>
              <Button icon on:click={() => newSubcategoryPopup = true}>
                <SubcategoryIcon />
                New subcategory
              </Button>
            </header>

            <div>
              {#each subcategories as subcategory}
                <ListItem clickable>
                  {subcategory.name}

                  <svelte:fragment slot="supporting">
                    {subcategory.description}
                  </svelte:fragment>
                </ListItem>
              {/each}
            </div>
          </VLayout>
          <!--        <VLayout>-->
          <!--          <header>-->
          <!--            <Button icon on:click={() => newSplitPopupOpen = true}>-->
          <!--              <SplitIcon />-->
          <!--              New split-->
          <!--            </Button>-->
          <!--          </header>-->

          <!--          <AsyncContent {promise}>-->
          <!--            <Table items={splits}>-->
          <!--              <svelte:fragment slot="header">-->
          <!--                <TableHead>Amount</TableHead>-->
          <!--                <TableHead>Category</TableHead>-->
          <!--                <TableHead wide>Description</TableHead>-->
          <!--                <TableHead>Actions</TableHead>-->
          <!--              </svelte:fragment>-->

          <!--              <svelte:fragment slot="row" let:item>-->
          <!--                <TextColumn>-->
          <!--                  <AmountSpan amount={item.amount} />-->
          <!--                </TextColumn>-->

          <!--                <TextColumn>-->
          <!--                  <CategorySpan category={item.category} />-->
          <!--                </TextColumn>-->

          <!--                <TextColumn>-->
          <!--                  {item.description}-->
          <!--                </TextColumn>-->

          <!--                <TextColumn>-->
          <!--                  {#if item.id !== "remainder"}-->
          <!--                    <HLayout>-->
          <!--                      <IconButton>-->
          <!--                        <EditIcon />-->
          <!--                      </IconButton>-->

          <!--                      <IconButton on:click={() => deleteSplit(item.id)}>-->
          <!--                        <DeleteIcon />-->
          <!--                      </IconButton>-->
          <!--                    </HLayout>-->
          <!--                  {/if}-->
          <!--                </TextColumn>-->
          <!--              </svelte:fragment>-->
          <!--            </Table>-->
          <!--          </AsyncContent>-->
          <!--        </VLayout>-->
        </Card>
      </div>
    </div>
  </div>
</AsyncContent>

<Dialog bind:open={editCategoryPopupOpen} fullScreen>
  <h2 slot="header">
    Edit details
  </h2>

  <VLayout>
    <Input label="Name" bind:value={updateDetails.name} />

    <TextArea label="Description" bind:value={updateDetails.description} />

    <ColorPicker bind:value={updateDetails.hexColor} />
  </VLayout>

  <svelte:fragment slot="actions">
    <Button text on:click={cancelEditingCategory}>
      Cancel
    </Button>

    <AsyncButton text asyncClick={saveChanges}>
      Save
    </AsyncButton>
  </svelte:fragment>

  <svelte:fragment slot="fullscreen-actions">
    <AsyncButton text asyncClick={saveChanges}>
      Save
    </AsyncButton>
  </svelte:fragment>
</Dialog>

<Dialog bind:open={newSubcategoryPopup} fullScreen>
  <h2 slot="header">
    New subcategory
  </h2>

  <Form
    on:submit={createNewSubcategory}
    on:cancel={() => newSubcategoryPopup = false}
  >
    <VLayout>
      <Input name="name" label="Name" autocomplete="off" />
      <TextArea name="description" label="Description" />

      <HLayout>
        <Button action="cancel" text icon>
          <CloseIcon />
          Cancel
        </Button>

        <Button action="submit" icon>
          <AddIcon />
          Create
        </Button>
      </HLayout>
    </VLayout>
  </Form>
</Dialog>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";
import CategoryService from "@/services/CategoryService";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Components
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import Card from "@/components/common/Card.svelte";
import Button from "@/components/common/Button.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import Dialog from "@/components/common/Dialog.svelte";
import Input from "@/components/common/Input.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import ColorPicker from "@/components/common/ColorPicker.svelte";
import TextArea from "@/components/common/TextArea.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import SubcategoryIcon from "@/components/icons/SubcategoryIcon.svelte";
import ListItem from "@/components/ListItem.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import Form from "@/components/common/Form.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
import CloseIcon from "@/components/icons/CloseIcon.svelte";

// Props
export let params: { categoryId: string };

// Data
const categoryService = new CategoryService();
let category: CategoryDTO;
let subcategories: SubcategoryDTO[] = [];
let successMessage = [""];
let errorMessage = [""];
let updateDetails: CategoryDetailsDTO = {
  name: "",
  description: "",
  hexColor: "",
};
let editCategoryPopupOpen = false;
let newSubcategoryPopup = false;

// Functions
async function refresh() {
  category = await categoryService.getCategoryById(params.categoryId);
  subcategories = await categoryService.getSubcategories(category.id);

  resetUpdateDetails();
}

function resetUpdateDetails() {
  updateDetails.name = category.name;
  updateDetails.description = category.description;
  updateDetails.hexColor = category.hexColor;
}

function cancelEditingCategory() {
  resetUpdateDetails();
  editCategoryPopupOpen = false;
}

async function saveChanges() {
  await categoryService.updateCategory(category.id, updateDetails);
  const remoteCategory = await categoryService.getCategoryById(category.id);

  Object.assign(category, remoteCategory);
  category = category;
  dispatch("routeEvent");

  cancelEditingCategory();
}

async function deleteCategory() {
  if (!confirm("Are you sure you want to delete this category?")) {
    return;
  }

  await categoryService.deleteCategory(category.id);
  dispatch("delete");
}

async function createNewSubcategory(event) {
  console.log(event);
}

const promise = refresh();
</script>

<style lang="scss">
@use "../../../scss/typescale";
@use "../../../scss/dp";

.transactionView {
    container-name: details;
    container-type: inline-size;
}

h2 {
    @include typescale.use-scale(headline-medium);
}

h3 {
    @include typescale.use-scale(headline-small);
}

.grid {
    display: grid;
    grid-gap: dp.dp(24);
    grid-template-columns: repeat(3, 1fr);
}

.details {
    grid-column: span 2;
    grid-row: span 2;
}

.splits {
    grid-column: span 1;
}

@container details (max-width: 700px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .details {
        grid-column: span 1;
    }
}

@container details (max-width: 700px) {
    .grid {
        display: flex;
        flex-direction: column;
    }

    .details {
        grid-column: span 1;
    }
}

</style>
