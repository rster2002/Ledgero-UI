<Page>
  <AsyncContent {promise}>
    <div class="grid">
      <Card>
        <h1>
          <CategorySpan {category} />
        </h1>

        <p>
          {category.description}
        </p>
      </Card>

      <Card>
        <CardStat label="Category total">
          {formatMoney(category.amount)}
        </CardStat>
      </Card>

      <div class="span">
        <Card>
          <VLayout>
            <HLayout>
              <Button on:click={() => newSubcategoryOpen = true}>
                <AddIcon />
                Add subcategory
              </Button>

              <Button on:click={() => editPopupOpen = true}>
                <EditIcon />
                Edit category
              </Button>

              <AsyncButton asyncClick={deleteCategory} --accent-color="var(--negative-amount-on-bg)" --tint-50="#FFEBEB">
                <DeleteIcon />
                Delete category
              </AsyncButton>
            </HLayout>

            <Table
              items={subcategories}
              on:click={(e) => openSubcategory(e.detail.id)}
              clickable
            >
              <svelte:fragment slot="header">
                <TableHead>Amount</TableHead>
                <TableHead wide>Name</TableHead>
                <TableHead />
              </svelte:fragment>

              <svelte:fragment let:item slot="row">
                <TextColumn>
                  <AmountSpan amount={item.amount} />
                </TextColumn>

                <TextColumn>
                  <SubcategorySpan subcategory={item} />
                </TextColumn>

                <CenterColumn>
                  <ArrowRightIcon />
                </CenterColumn>
              </svelte:fragment>
            </Table>
          </VLayout>
        </Card>
      </div>
    </div>
  </AsyncContent>
</Page>

<Popup bind:open={editPopupOpen}>
  <VLayout>
    <CardHeader>
      <h2>Edit category</h2>
    </CardHeader>

    <CategoryDetailsForm bind:value={editDetails} />

    <HLayout full>
      <Button on:click={cancelEditing} secondary>
        <CloseIcon />
        Cancel
      </Button>

      <AsyncButton asyncClick={saveChanges}>
        <SaveIcon />
        Save changes
      </AsyncButton>
    </HLayout>
  </VLayout>
</Popup>

<Popup bind:open={newSubcategoryOpen}>
  <VLayout>
    <CardHeader>
      <h2>New subcategory</h2>
    </CardHeader>

    <CategoryDetailsForm bind:value={newSubcategoryDetails} />

    <HLayout full>
      <Button on:click={cancelNewSubcategory} secondary>
        <CloseIcon />
        Cancel
      </Button>

      <AsyncButton asyncClick={createSubcategory}>
        <SaveIcon />
        Create subcategory
      </AsyncButton>
    </HLayout>
  </VLayout>
</Popup>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";
import CategoryService from "@/services/CategoryService";
import { push } from "svelte-spa-router";
import formatMoney from "@/utils/formatMoney";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/common/Card.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import Button from "@/components/common/Button.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import Popup from "@/components/common/Popup.svelte";
import CategoryDetailsForm from "@/components/forms/CategoryDetailsForm.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import CardHeader from "@/components/fragments/CardHeader.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import CloseIcon from "@/components/icons/CloseIcon.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import Table from "@/components/Table.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
import ColorSpan from "@/components/spans/ColorSpan.svelte";
import CenterColumn from "@/components/Table/CenterColumn.svelte";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.svelte";
import SubcategorySpan from "@/components/spans/SubcategorySpan.svelte";

// Props
export var params: { id: string } = {};

// Data
const categoryService = new CategoryService();
let promise: Promise<unknown>;
let successMessage = [""];
let errorMessage = [""];
let category: CategoryDTO;
let editPopupOpen = false;
let editDetails: CategoryDetailsDTO = {
    name: "",
    description: "",
    hexColor: "",
};
let subcategories: SubcategoryDTO[] = [];
let newSubcategoryOpen = false;
let newSubcategoryDetails: CategoryDetailsDTO = {
    name: "",
    description: "",
    hexColor: "ffffff",
};

// Functions
async function refresh() {
    category = await categoryService.getCategoryById(params.id);
    subcategories = await categoryService.getSubcategories(params.id);
    refreshEditor();
}

function refreshEditor() {
    editDetails = {
        name: category.name,
        description: category.description,
        hexColor: category.hexColor,
    };
}

function cancelEditing() {
    refreshEditor();
    editPopupOpen = false;
}

async function deleteCategory() {
    if (confirm("Are you sure you want to delete this category?")) {
        await categoryService.deleteCategory(category.id);
        await push("/categories");
    }
}

async function saveChanges() {
    try {
        await categoryService.updateCategory(category.id, editDetails);

        successMessage = ["Successfully updated"];
        editPopupOpen = false;
        promise = refresh();
    } catch (e) {
        errorMessage = [e.message];
    }
}

function refreshSubcategoryEditor() {
    newSubcategoryDetails = {
        name: "",
        description: "",
        hexColor: "ffffff",
    };
}

function cancelNewSubcategory() {
    refreshSubcategoryEditor();
    newSubcategoryOpen = false;
}

async function createSubcategory() {
    try {
        await categoryService.createSubcategory(category.id, newSubcategoryDetails);

        successMessage = ["Subcategory created"];
        newSubcategoryOpen = false;
        refreshSubcategoryEditor();
        promise = refresh();
    } catch (e) {
        errorMessage = [e.message];
    }
}

function openSubcategory(subcategoryId: string) {
    push(`/categories/${category.id}/subcategory/${subcategoryId}`);
}

promise = refresh();
</script>

<style lang="scss">

h1 {
    margin: 0;
    font-size: 2em;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;

    .span {
        grid-column: span 2;
    }
}

</style>
