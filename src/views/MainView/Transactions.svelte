<div class="wrapper">
  <div class="transactions">
    <Card>
      {#each transactions as transaction}
        <TransactionListItem {transaction} on:click={() => openTransaction(transaction)} />
      {/each}

      {#if !transactionsDone}
        <footer>
          <AsyncButton asyncClick={nextPage}>
            Load more
          </AsyncButton>
        </footer>
      {/if}
    </Card>
  </div>

  <div class="details">
    {#if openedTransaction === null}
      No transaction open
    {:else}
      <TransactionView transaction={openedTransaction} />
    {/if}
  </div>
</div>

<script lang="ts">
// Imports
import TransactionService from "@/services/TransactionService";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import Card from "@/components/common/Card.svelte";
import TransactionListItem from "@/components/TransactionListItem.svelte";
import TransactionView from "@/components/TransactionView.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";

// Data
const transactionsService = new TransactionService();
let transactions: TransactionDTO[] = [];
let transactionsDone = false;
let transactionPaginator = transactionsService.createTransactionsIterator();
let openedTransaction: TransactionDTO | null = null;

// Functions
function openTransaction(transaction: TransactionDTO) {
    // push("/transactions/" + transaction.id);
  openedTransaction = transaction;
}

async function nextPage() {
    let iteration = await transactionPaginator.next();

    transactionsDone = iteration.done;

    transactions = [
        ...transactions,
        ...iteration.value,
    ]
}

async function refresh() {
    await nextPage();
}

const promise = refresh();
</script>

<style lang="scss">
@import "../../shared";

.wrapper {
    height: 100%;
    width: 100%;

    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100%;

    .transactions  {
        height: 100%;

        grid-column: span 4;
    }

    .details  {
        grid-column: span 8;
    }

    :global(.card) {
        height: 100%;
        overflow-y: auto;
    }
}

.transactions footer {
    display: grid;
    place-items: center;
    padding: dp(16);
}

</style>
