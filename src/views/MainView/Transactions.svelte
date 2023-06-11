<div class="wrapper">
  <div class="transactions">

    <Card>
      {#each transactions as transaction}
        <TransactionListItem {transaction} on:click={() => openTransaction(transaction)} />
      {/each}
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

// Data
const transactionsService = new TransactionService();
let transactions: TransactionDTO[] = [];
let transactionPaginator = transactionsService.createTransactionsIterator();
let openedTransaction: TransactionDTO | null = null;

// Functions
function openTransaction(transaction: TransactionDTO) {
    // push("/transactions/" + transaction.id);
  openedTransaction = transaction;
}

async function refresh() {
    transactions = (await transactionPaginator.next()).value;
}

const promise = refresh();
</script>

<style lang="scss">

.wrapper {
    height: 100%;
    width: 100%;

    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100%;

    .transactions  {
        height: 100%;

        grid-column: span 3;
    }

    .details  {
        grid-column: span 9;
    }

    :global(.card) {
        height: 100%;
        overflow-y: auto;
    }
}

</style>
