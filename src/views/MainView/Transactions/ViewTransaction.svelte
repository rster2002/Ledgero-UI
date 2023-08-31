<AsyncContent {promise}>
  <div class="transactionView">
    <div class="grid">
      <Card outlineCompact>
        <header>
          <h2>
            <AmountSpan amount={transaction.amount} sign />
          </h2>
          <h3>
            {#if isContact}
              <ContactIcon />
            {/if}

            {transactionName}
          </h3>
        </header>
      </Card>

      <div class="details">
        <Card outlineCompact>
          <VLayout>
            <TransactionDetails {transaction} />
            <HLayout wrap>
              <Button on:click={() => editTransactionPopupOpen = true} icon outline>
                <EditIcon />
                Edit details
              </Button>

              {#if suggestionsAvailable}
                <Button icon text>
                  <SuggestionIcon />
                  Review suggestions
                </Button>
              {/if}
            </HLayout>
          </VLayout>
        </Card>
      </div>

      <div class="splits">
        <Card outlineCompact>
          <VLayout>
            <header>
              <Button icon on:click={() => newSplitPopupOpen = true}>
                <SplitIcon />
                New split
              </Button>
            </header>

            <AsyncContent {promise}>
              <Table items={splits}>
                <svelte:fragment slot="header">
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead wide>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </svelte:fragment>

                <svelte:fragment slot="row" let:item>
                  <TextColumn>
                    <AmountSpan amount={item.amount} />
                  </TextColumn>

                  <TextColumn>
                    <CategorySpan category={item.category} />
                  </TextColumn>

                  <TextColumn>
                    {item.description}
                  </TextColumn>

                  <TextColumn>
                    {#if item.id !== "remainder"}
                      <HLayout>
                        <IconButton>
                          <EditIcon />
                        </IconButton>

                        <IconButton on:click={() => deleteSplit(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </HLayout>
                    {/if}
                  </TextColumn>
                </svelte:fragment>
              </Table>
            </AsyncContent>
          </VLayout>
        </Card>
      </div>
    </div>
  </div>
</AsyncContent>

<Dialog bind:open={newSplitPopupOpen} fullScreen>
  <h2 slot="header">
    Create split
  </h2>

  <VLayout>
    <Input bind:value={newSplit.amount} label="Amount" type="number" />
    <Input bind:value={newSplit.description} label="Description" />
  </VLayout>

  <svelte:fragment slot="actions">
    <Button text on:click={() => newSplitPopupOpen = false}>
      Cancel
    </Button>

    <Button text on:click={createSplit}>
      Create
    </Button>
  </svelte:fragment>

  <svelte:fragment slot="fullscreen-actions">
    <Button text on:click={createSplit}>
      Create
    </Button>
  </svelte:fragment>
</Dialog>

<Dialog bind:open={editTransactionPopupOpen} fullScreen>
  <h2 slot="header">
    Edit details
  </h2>

  <GridLayout wide>
    <div class="span6">
      <CategorySelect
        bind:categoryId={transactionDetails.categoryId}
        bind:subcategoryId={transactionDetails.subcategoryId}
      />
    </div>

    <div class="span6">
      <ExternalAccountSelect
        bind:externalAccountId={transactionDetails.externalAccountId}
        externalAccountName={transaction.externalAccountName}
      />
    </div>

    <div class="span12">
      <TextArea label="Description" bind:value={transactionDetails.description} />
    </div>
  </GridLayout>

  <svelte:fragment slot="actions">
    <Button text on:click={cancelEditingTransaction}>
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

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import TransactionService from "@/services/TransactionService";
import type SplitDTO from "@/models/dto/transactions/SplitDTO";
import type NewSplitDTO from "@/models/dto/transactions/NewSplitDTO";
import type UpdateTransactionDetailsDTO from "@/models/dto/transactions/UpdateTransactionDetailsDTO";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Components
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import Card from "@/components/common/Card.svelte";
import SplitIcon from "@/components/icons/SplitIcon.svelte";
import Button from "@/components/common/Button.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import ContactIcon from "@/components/icons/ContactIcon.svelte";
import Input from "@/components/common/Input.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import SuggestionIcon from "@/components/icons/SuggestionIcon.svelte";
import Dialog from "@/components/common/Dialog.svelte";
import UpdateTransactionDetailsForm from "@/components/forms/UpdateTransactionDetailsForm.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import IconButton from "@/components/common/IconButton.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import Table from "@/components/Table.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import TransactionDetails from "@/components/fragments/TransactionDetails.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import ExternalAccountSelect from "@/components/ExternalAccountSelect.svelte";
import CategorySelect from "@/components/CategorySelect.svelte";
import GridLayout from "@/components/layouts/GridLayout.svelte";
import TextArea from "@/components/common/TextArea.svelte";

// Props
export var params: { transactionId: string };

// Data
const transactionService = new TransactionService();
let transaction: TransactionDTO;
let successMessage = [""];
let errorMessage = [""];
let splits: SplitDTO[] = [];
let transactionDetails: UpdateTransactionDetailsDTO = {
  description: "",
  categoryId: null,
  subcategoryId: null,
  externalAccountId: null,
};
let newSplit: NewSplitDTO = {
  amount: 0,
  description: "",
  categoryId: null,
};
let newSplitPopupOpen = false;
let editTransactionPopupOpen = false;
let suggestionsAvailable = true; // TODO implement
let promise;

// Computed
$: isContact = !!transaction.externalAccount?.name;
$: transactionName = transaction.externalAccount?.name ?? transaction.externalAccountName;
$: promise = params && refresh();

// Functions
async function refresh() {
  transaction = await transactionService.getTransaction(params.transactionId);
  splits = await transactionService.getSplitsFor(transaction.id);

  resetUpdateDetails();
}

function resetUpdateDetails() {
  transactionDetails.description = transaction.description;
  transactionDetails.categoryId  = transaction.category?.id ?? null;
  transactionDetails.subcategoryId  = transaction.subcategory?.id ?? null;
  transactionDetails.externalAccountId  = transaction.externalAccount?.id ?? null;
}

function cancelEditingTransaction() {
  resetUpdateDetails();
  editTransactionPopupOpen = false;
}

async function createSplit() {
  let split = {
    ...newSplit,
  }

  split.amount = Number(Number(newSplit.amount).toFixed(2)) * 100;

  try {
    await transactionService.createSplit(transaction.id, split);
  } catch (e) {
    errorMessage = [e.message];
    return;
  }

  promise = refresh();
  successMessage = ["Split created"];
  newSplitPopupOpen = false;
  newSplit = {
    amount: 0,
    description: "",
  };
}

async function deleteSplit(splitId: string) {
  if (confirm("Are you sure you want to delete this split?")) {
    await transactionService.deleteSplit(transaction.id, splitId);
    promise = refresh();
  }
}

async function saveChanges() {
  await transactionService.updateDetails(transaction.id, transactionDetails);
  const remoteTransaction = await transactionService.getTransaction(transaction.id);

  Object.assign(transaction, remoteTransaction);
  transaction = transaction;
  dispatch("change");

  cancelEditingTransaction();
}

promise = refresh();
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
}

.splits {
    grid-column: span 2;
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
