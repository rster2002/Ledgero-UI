<Page>
  <AsyncContent {promise}>
    <div class="grid">
      <Card>
        <h1>
          <SubcategorySpan {subcategory} />
        </h1>

        <p>
          {subcategory.description}
        </p>
      </Card>

      <Card>
        <CardStat label="Subcategory total">
          {formatMoney(subcategory.amount)}
        </CardStat>
      </Card>

      <div class="span">
        <Card>
          <VLayout>
            <HLayout>
              <Button icon outline on:click={() => editPopupOpen = true}>
                <EditIcon />
                Edit subcategory
              </Button>

              <AsyncButton icon text asyncClick={deleteSubcategory} --accent-color="var(--negative-amount-on-bg)" --tint-50="#FFEBEB">
                <DeleteIcon />
                Delete subcategory
              </AsyncButton>
            </HLayout>

            <h2>Transactions</h2>

            <PaginatedTransactionsTable paginator={transactionPaginator} showCategory={false} />
          </VLayout>
        </Card>
      </div>
    </div>
  </AsyncContent>
</Page>

<!--<Popup bind:open={editPopupOpen}>-->
<!--  <VLayout>-->
<!--    <CardHeader>-->
<!--      <h2>Edit subcategory</h2>-->
<!--    </CardHeader>-->

<!--    <CategoryDetailsForm bind:value={editDetails} />-->

<!--    <HLayout full>-->
<!--      <Button on:click={cancelEditing} secondary>-->
<!--        <CloseIcon />-->
<!--        Cancel-->
<!--      </Button>-->

<!--      <AsyncButton asyncClick={saveChanges}>-->
<!--        <SaveIcon />-->
<!--        Save changes-->
<!--      </AsyncButton>-->
<!--    </HLayout>-->
<!--  </VLayout>-->
<!--</Popup>-->

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";
import CategoryService from "@/services/CategoryService";
import { push } from "svelte-spa-router";
import formatMoney from "@/utils/formatMoney";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/common/Card.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import Button from "@/components/common/Button.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
// import Popup from "@/components/common/Popup.svelte";
import CategoryDetailsForm from "@/components/forms/CategoryDetailsForm.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import CardHeader from "@/components/fragments/CardHeader.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import CloseIcon from "@/components/icons/CloseIcon.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import SubcategorySpan from "@/components/spans/SubcategorySpan.svelte";
import PaginatedTransactionsTable from "@/components/tables/PaginatedTransactionsTable.svelte";

// Props
export var params: { id: string, subcategoryId: string } = {};

// Data
const categoryService = new CategoryService();
let promise: Promise<unknown>;
let transactionPaginator;
let successMessage = [""];
let errorMessage = [""];
let subcategory: SubcategoryDTO;
let editPopupOpen = false;
let editDetails: CategoryDetailsDTO = {
    name: "",
    description: "",
    hexColor: "",
};

// Functions
async function refresh() {
    subcategory = await categoryService.getSubcategoryById(params.id, params.subcategoryId);
    transactionPaginator = categoryService.createTransactionIteratorForSubcategory(params.id, params.subcategoryId);
    refreshEditor();
}

function refreshEditor() {
    editDetails = {
        name: subcategory.name,
        description: subcategory.description,
        hexColor: subcategory.hexColor,
    };
}

function cancelEditing() {
    refreshEditor();
    editPopupOpen = false;
}

async function deleteSubcategory() {
    if (confirm("Are you sure you want to delete this category?")) {
        await categoryService.deleteSubcategory(params.id, params.subcategoryId);
        await push(`/categories/${params.id}`);
    }
}

async function saveChanges() {
    try {
        await categoryService.updateSubcategory(params.id, params.subcategoryId, editDetails);

        successMessage = ["Successfully updated"];
        editPopupOpen = false;
        promise = refresh();
    } catch (e) {
        errorMessage = [e.message];
    }
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
