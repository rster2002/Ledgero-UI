<Page>
  <AsyncContent {promise}>
    <div class="grid">
      <Card>
        <h1>
          <BankAccountSpan {bankAccount} />
        </h1>

        <p>
          {bankAccount.description}
        </p>
      </Card>

      <Card>
        <CardStat label="Bank account total">
          {formatMoney(bankAccount.amount)}
        </CardStat>
      </Card>

      <div class="span">
        <Card>
          <VLayout>
            <HLayout>
              <Button on:click={() => editPopupOpen = true}>
                <EditIcon />
                Edit bank account
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

<Dialog bind:open={editPopupOpen}>
  <h2 slot="header">Edit category</h2>

  <VLayout>
    <CategoryDetailsForm bind:value={editDetails} />
  </VLayout>

  <svelte:fragment slot="actions">
    <Button on:click={cancelEditing} secondary>
      <CloseIcon />
      Cancel
    </Button>
  </svelte:fragment>

  <svelte:fragment slot="fullscreen-actions">
    <AsyncButton asyncClick={saveChanges}>
      <SaveIcon />
      Save changes
    </AsyncButton>
  </svelte:fragment>
</Dialog>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Components
import Dialog from "@/components/common/Dialog.svelte";
import Page from "@/components/Page.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import Card from "@/components/common/Card.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import PaginatedTransactionsTable from "@/components/tables/PaginatedTransactionsTable.svelte";
import Button from "@/components/common/Button.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import BankAccountSpan from "@/components/spans/BankAccountSpan.svelte";
import CategoryDetailsForm from "@/components/forms/CategoryDetailsForm.svelte";
import CloseIcon from "@/components/icons/CloseIcon.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";

// Imports
import BankAccountService from "@/services/BankAccountService";
import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";
import formatMoney from "@/utils/formatMoney";
import type BankAccountDetailsDTO from "@/models/dto/bankAccounts/BankAccountDetailsDTO";

// Props
export var params: { id: string } = {};

// Data
const bankAccountService = new BankAccountService();
let promise: Promise<void>;
let transactionPaginator;
let successMessage = [""];
let errorMessage = [""];
let bankAccount: BankAccountDTO;
let editPopupOpen = false;
let editDetails: BankAccountDetailsDTO = {
    name: "",
    description: "",
    hexColor: "",
};

// Functions
async function refresh() {
    bankAccount = await bankAccountService.getBankAccountById(params.id);
    transactionPaginator = bankAccountService.createTransactionIteratorForCategory(params.id);
    refreshEditor();
}

function refreshEditor() {
    editDetails = {
        name: bankAccount.name,
        description: bankAccount.description,
        hexColor: bankAccount.hexColor,
    }
}

function cancelEditing() {
    refreshEditor();
    editPopupOpen = false;
}

async function saveChanges() {
    try {
        await bankAccountService.updateBankAccountDetails(bankAccount.id, editDetails);

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
