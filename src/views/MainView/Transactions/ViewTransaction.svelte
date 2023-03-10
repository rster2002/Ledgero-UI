<Page>
  <AsyncContent {promise}>
    <PageHeader>
      <h1>Transaction</h1>
    </PageHeader>

    <div class="grid">
      <Card>
        <TransactionHeader {transaction} />
      </Card>

      <Card>
        <TransactionDetails {transaction} />
      </Card>

      <div class="span">
        <Card>
          <VLayout>
            <HLayout>
              <Button on:click={() => editTransactionPopupOpen = true}>
                <EditIcon />
                Edit transaction
              </Button>

              <Button on:click={() => newSplitPopupOpen = true}>
                <SplitIcon />
                New split
              </Button>
            </HLayout>

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
                  <IconButton>
                    <EditIcon />
                  </IconButton>

                  <IconButton on:click={() => deleteSplit(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TextColumn>
              </svelte:fragment>
            </Table>
          </VLayout>
        </Card>
      </div>
    </div>
  </AsyncContent>
</Page>

<Popup bind:open={newSplitPopupOpen} min>
  <div class="minForm">
    <VLayout>
      <CardHeader>
        <h2>New split</h2>
      </CardHeader>

      <Input bind:value={newSplit.amount} label="Amount" type="number" />
      <Input bind:value={newSplit.description} label="Description" />

      <div>
        <CategorySelect bind:value={newSplitSelectedCategory} />
      </div>

      <AsyncButton asyncClick={createSplit}>
        Create
      </AsyncButton>
    </VLayout>
  </div>
</Popup>

<Popup bind:open={editTransactionPopupOpen}>
  <div class="minForm">
    <VLayout>
      <CardHeader>
        <h2>Edit transaction</h2>
      </CardHeader>
    </VLayout>
  </div>
</Popup>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import TransactionService from "@/services/TransactionService";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/common/Card.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import TransactionHeader from "@/components/fragments/TransactionHeader.svelte";
import TransactionDetails from "@/components/fragments/TransactionDetails.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import Button from "@/components/common/Button.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
import Table from "@/components/Table.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import AmountSpan from "@/components/AmountSpan.svelte";
import CategorySpan from "@/components/CategorySpan.svelte";
import Popup from "@/components/common/Popup.svelte";
import Input from "@/components/common/Input.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import type NewSplitDTO from "@/models/dto/transactions/NewSplitDTO";
import CategorySelect from "@/components/CategorySelect.svelte";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CardHeader from "@/components/fragments/CardHeader.svelte";
import type SplitDTO from "@/models/dto/transactions/SplitDTO";
import IconButton from "@/components/common/IconButton.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import SplitIcon from "@/components/icons/SplitIcon.svelte";

// Props
export var params: { id: string } = {};

// Data
const transactionService = new TransactionService();
let successMessage = [""];
let errorMessage = [""];
let transaction: TransactionDTO;
let splits: SplitDTO[] = [];
let promise: Promise<unknown>;
let newSplitPopupOpen = false;
let newSplitSelectedCategory: CategoryDTO = null;
let newSplit: NewSplitDTO = {
    amount: 0,
    description: "",
};
let editTransactionPopupOpen = false;

// Functions
async function createSplit() {
    let split = {
        ...newSplit,
    }

    split.categoryId = newSplitSelectedCategory?.id ?? null;
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

async function refresh() {
    transaction = await transactionService.getTransaction(params.id);
    splits = await transactionService.getSplitsFor(params.id);
}

async function deleteSplit(splitId: string) {
    if (confirm("Are you sure you want to delete this split?")) {
        await transactionService.deleteSplit(params.id, splitId);
        promise = refresh();
    }
}

promise = refresh();
</script>

<style lang="scss">

.minForm {
    min-width: 400px;
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
