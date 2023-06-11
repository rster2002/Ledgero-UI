<div class="transactionView">
  <div class="grid">
    <Card>
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
      <Card>
        <VLayout>
          <TransactionDetails {transaction} />
          <HLayout>
            <Button icon outline>
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
      <Card>
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
                    <IconButton>
                      <EditIcon />
                    </IconButton>

                    <IconButton on:click={() => deleteSplit(item.id)}>
                      <DeleteIcon />
                    </IconButton>
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

<Popup bind:open={newSplitPopupOpen} min>
  <div class="minForm">
    <VLayout>
      <CardHeader>
        <h2>New split</h2>
      </CardHeader>

      <Input bind:value={newSplit.amount} label="Amount" type="number" />
      <Input bind:value={newSplit.description} label="Description" />

      <div>
        <CategorySelect bind:categoryId={newSplit.categoryId} />
      </div>

      <AsyncButton asyncClick={createSplit}>
        Create
      </AsyncButton>
    </VLayout>
  </div>
</Popup>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import TransactionDetails from "@/components/fragments/TransactionDetails.svelte";
import TransactionService from "@/services/TransactionService";
import type SplitDTO from "@/models/dto/transactions/SplitDTO";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import IconButton from "@/components/common/IconButton.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import Table from "@/components/Table.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import type NewSplitDTO from "@/models/dto/transactions/NewSplitDTO";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import Card from "@/components/common/Card.svelte";
import SplitIcon from "@/components/icons/SplitIcon.svelte";
import Button from "@/components/common/Button.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import ContactIcon from "@/components/icons/ContactIcon.svelte";
import CategorySelect from "@/components/CategorySelect.svelte";
import Input from "@/components/common/Input.svelte";
import CardHeader from "@/components/fragments/CardHeader.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import Popup from "@/components/common/Popup.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import SuggestionIcon from "@/components/icons/SuggestionIcon.svelte";

// Props
export var transaction: TransactionDTO;

// Data
const transactionService = new TransactionService();
let successMessage = [""];
let errorMessage = [""];
let splits: SplitDTO[] = [];
let newSplit: NewSplitDTO = {
    amount: 0,
    description: "",
    categoryId: null,
};
let newSplitPopupOpen = false;
let suggestionsAvailable = false; // TODO implement
let promise;

// Computed
$: isContact = !!transaction.externalAccount?.name;
$: transactionName = transaction.externalAccount?.name ?? transaction.externalAccountName;
$: promise = refresh();

// Functions
async function refresh() {
    splits = await transactionService.getSplitsFor(transaction.id);
}

async function createSplit() {
    let split = {
        ...newSplit,
    }

    split.amount = Number(Number(newSplit.amount).toFixed(2)) * 100;

    try {
        await transactionService.createSplit(params.id, split);
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
</script>

<style lang="scss">
@import "../shared";

h2 {
    font-size: dp(38);
}

h3 {
   @include mdl-font(headline-small);
}

.grid {
    display: grid;
    grid-gap: dp(24);
    grid-template-columns: repeat(3, 1fr);
}

.details {
    grid-column: span 2;
}

.splits {
    grid-column: span 2;
}

</style>
