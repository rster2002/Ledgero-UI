<Page>
  <AsyncContent {promise}>
    <div class="grid">
      <Card>
        <VLayout>
          <h1>
            <ExternalAccountSpan {externalAccount} />
          </h1>

          <IconSection>
            <TextIcon slot="icon" />
            {externalAccount.description}
          </IconSection>

          <IconSection>
            <CategoryIcon slot="icon" />
            <FullCategorySpan
              icon={false}
              {category}
              {subcategory}
            />
          </IconSection>
        </VLayout>
      </Card>

      <div class="span">
        <Card>
          <VLayout>
            <HLayout>
              <Button on:click={() => editPopupOpen = true}>
                <EditIcon />
                Edit external account
              </Button>
            </HLayout>

            <h2>Transactions</h2>

            <PaginatedTransactionsTable paginator={transactionPaginator} showCategory={false} />
          </VLayout>
        </Card>
      </div>
    </div>
  </AsyncContent>
</Page>

<Popup bind:open={editPopupOpen}>
  <VLayout>
    <CardHeader>
      <h2>Edit external account</h2>
    </CardHeader>

    <ExternalAccountDetailsForm bind:value={editDetails} />

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

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import ExternalAccountService from "@/services/ExternalAccountService";
import CategoryService from "@/services/CategoryService";
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import type ExternalAccountDetailsDTO from "@/models/dto/externalAccounts/ExternalAccountDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";

// Components
import Page from "@/components/Page.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import Card from "@/components/common/Card.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import PaginatedTransactionsTable from "@/components/tables/PaginatedTransactionsTable.svelte";
import Button from "@/components/common/Button.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import Popup from "@/components/common/Popup.svelte";
import CloseIcon from "@/components/icons/CloseIcon.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import CardHeader from "@/components/fragments/CardHeader.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import ExternalAccountDetailsForm from "@/components/forms/ExternalAccountDetailsForm.svelte";
import ExternalAccountSpan from "@/components/spans/ExternalAccountSpan.svelte";
import IconSection from "@/components/common/IconSection.svelte";
import TextIcon from "@/components/icons/TextIcon.svelte";
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import FullCategorySpan from "@/components/spans/FullCategorySpan.svelte";

// Props
export var params: { id: string } = {};

// Data
const externalAccountsService = new ExternalAccountService();
const categoriesService = new CategoryService();
let promise: Promise<void>;
let transactionPaginator;
let successMessage = [""];
let errorMessage = [""];
let externalAccount: ExternalAccountDTO;
let editPopupOpen = false;
let category: CategoryDTO;
let subcategory: SubcategoryDTO;
let editDetails: ExternalAccountDetailsDTO = {
    name: "",
    description: "",
    hexColor: "",
    defaultCategoryId: null,
    defaultSubcategoryId: null,
};

// Functions
async function refresh() {
    externalAccount = await externalAccountsService.getExternalAccountById(params.id);
    transactionPaginator = externalAccountsService.createTransactionIteratorForExternalAccount(params.id);

    if (externalAccount.defaultCategoryId) {
        category = await categoriesService.getCategoryById(externalAccount.defaultCategoryId);
    }

    if (externalAccount.defaultSubcategoryId) {
        subcategory = await category.subcategories
            .find(subcategory => subcategory.id === externalAccount.defaultSubcategoryId)
            ?? null;
    }

    refreshEditor();
}

function refreshEditor() {
    editDetails = {
        name: externalAccount.name,
        description: externalAccount.description,
        hexColor: externalAccount.hexColor,
        defaultCategoryId: externalAccount.defaultCategoryId,
        defaultSubcategoryId: externalAccount.defaultSubcategoryId,
    }
}

function cancelEditing() {
    refreshEditor();
    editPopupOpen = false;
}

async function saveChanges() {
    try {
        await externalAccountsService.updateExternalAccountDetails(externalAccount.id, editDetails);

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
