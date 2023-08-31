<div class="wrapper">
  <div class="transactions">
    <Card disappearCompact>
      <AsyncContent {promise}>
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
      </AsyncContent>
    </Card>
  </div>

  <div class="details">
    <InlinePage
      title="Transaction"
      open={openedTransaction !== null}
      on:close={() => openedTransaction = null}
    >
      <Router
        routes={{
          "/transactions/:transactionId": ViewTransaction,
        }}
      />
      <!--{#if openedTransaction === null}-->
      <!--  No transaction open-->
      <!--{:else}-->
      <!--  <TransactionView transaction={openedTransaction} on:change={() => transactions = transactions} />-->
      <!--{/if}-->
    </InlinePage>
  </div>
</div>

<script lang="ts">
// Imports
import TransactionService from "@/services/TransactionService";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import Card from "@/components/common/Card.svelte";
import TransactionListItem from "@/components/TransactionListItem.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import InlinePage from "@/components/InlinePage.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import Router, { push } from "svelte-spa-router";
import ViewTransaction from "@/views/MainView/Transactions/ViewTransaction.svelte";

// Data
const transactionsService = new TransactionService();
let transactions: TransactionDTO[] = [];
let transactionsDone = false;
let transactionPaginator = transactionsService.createTransactionsIterator();
let openedTransaction: TransactionDTO | null = null;

// Functions
function openTransaction(transaction: TransactionDTO) {
  push(`/transactions/${transaction.id}`);
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

.wrapper {
    height: 100%;
    width: 100%;

    container-type: inline-size;
    container-name: transactions;

    display: grid;
    grid-gap: dp(24);
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

@container (width < 80rem) {
    .wrapper {
        .transactions {
            grid-column: span 6;
        }

        .details {
            grid-column: span 6;
        }
    }
}

//@container transactions (max-width: 40rem) {
//    .wrapper {
//        .transactions {
//            grid-column: span 6;
//        }
//
//        .details {
//            grid-column: span 6;
//        }
//    }
//}
//
//@media only screen and (max-width: $compact-breakpoint) {
//    .wrapper {
//        display: block;
//
//        .transactions {
//            :global(.card) {
//                height: 100%;
//                box-sizing: border-box;
//            }
//        }
//    }
//}

</style>
