<div class="wrapper">
  <div class="transactions">

    <Card>
      {#each transactions as transaction}
        <TransactionListItem {transaction} on:click={() => push("/transactions/" + transaction.id)} />
      {/each}
    </Card>
  </div>

  <div class="details">
    <Card></Card>
  </div>
</div>

<script lang="ts">
// Imports
import TransactionService from "@/services/TransactionService";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import Card from "@/components/common/Card.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import TransactionListItem from "@/components/TransactionListItem.svelte";
import PaginatedTransactionsTable from "@/components/tables/PaginatedTransactionsTable.svelte";
import { push } from "svelte-spa-router";

// Data
const transactionsService = new TransactionService();
let transactions: TransactionDTO[] = [];
let transactionPaginator = transactionsService.createTransactionsIterator();

// Functions
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

<!--<Page>-->
<!--  <PageHeader>-->
<!--    <h1>-->
<!--      <TransactionsIcon />-->
<!--      Transactions-->
<!--    </h1>-->
<!--  </PageHeader>-->

<!--  <div class="grid">-->
<!--    <Card>-->
<!--      <AsyncContent {promise}>-->
<!--        <CardStat label="Net worth">-->
<!--          {formatMoney(total)}-->
<!--        </CardStat>-->
<!--      </AsyncContent>-->
<!--    </Card>-->

<!--    <Card>-->

<!--    </Card>-->

<!--    <div class="span">-->
<!--      <Card>-->
<!--        <VLayout>-->
<!--          <HLayout>-->
<!--            <Button on:click={() => push("/transactions/upload")}>-->
<!--              <UploadIcon />-->
<!--              Upload CSV-->
<!--            </Button>-->
<!--          </HLayout>-->

<!--          <PaginatedTransactionsTable paginator={transactionPaginator} />-->
<!--        </VLayout>-->
<!--      </Card>-->
<!--    </div>-->
<!--  </div>-->
<!--</Page>-->

<!--<script lang="ts">-->
<!--// Imports-->
<!--import AggregateService from "@/services/AggregateService";-->
<!--import TransactionService from "@/services/TransactionService";-->
<!--import formatMoney from "@/utils/formatMoney";-->
<!--import { push } from "svelte-spa-router";-->
<!--import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";-->
<!--import type CategoryDTO from "@/models/dto/categories/CategoryDTO";-->
<!--import CategoryService from "@/services/CategoryService";-->

<!--// Components-->
<!--import Page from "@/components/Page.svelte";-->
<!--import Card from "@/components/common/Card.svelte";-->
<!--import CardStat from "@/components/fragments/CardStat.svelte";-->
<!--import AsyncContent from "@/components/common/AsyncContent.svelte";-->
<!--import TableHead from "@/components/Table/TableHead.svelte";-->
<!--import TextColumn from "@/components/Table/TextColumn.svelte";-->
<!--import AmountSpan from "@/components/spans/AmountSpan.svelte";-->
<!--import CategorySpan from "@/components/spans/CategorySpan.svelte";-->
<!--import VLayout from "@/components/layouts/VLayout.svelte";-->
<!--import HLayout from "@/components/layouts/HLayout.svelte";-->
<!--import UploadIcon from "@/components/icons/UploadIcon.svelte";-->
<!--import Button from "@/components/common/Button.svelte";-->
<!--import PaginationTable from "@/components/PaginationTable.svelte";-->
<!--import PageHeader from "@/components/fragments/PageHeader.svelte";-->
<!--import TransactionsIcon from "@/components/icons/TransactionsIcon.svelte";-->
<!--import CenterColumn from "@/components/Table/CenterColumn.svelte";-->
<!--import ArrowRightIcon from "@/components/icons/ArrowRightIcon.svelte";-->
<!--import FullCategorySpan from "@/components/spans/FullCategorySpan.svelte";-->
<!--import PaginatedTransactionsTable from "@/components/tables/PaginatedTransactionsTable.svelte";-->

<!--// Data-->
<!--const aggregateService = new AggregateService();-->
<!--const transactionsService = new TransactionService();-->
<!--const categoriesService = new CategoryService();-->
<!--const transactionPaginator = transactionsService.createTransactionsIterator();-->
<!--let updateFn;-->
<!--let categories: CategoryDTO[] = [];-->
<!--let total: number = 0;-->

<!--// Functions-->
<!--async function create() {-->
<!--    categories = await categoriesService.getAllCategories();-->
<!--    categories.unshift(null);-->
<!--    total = await aggregateService.getNetWorth();-->
<!--}-->

<!--function openTransaction(transaction: TransactionDTO) {-->
<!--    push(`/transactions/${transaction.id}`);-->
<!--}-->

<!--const promise = create();-->
<!--</script>-->

<!--<style lang="scss">-->

<!--.grid {-->
<!--    display: grid;-->
<!--    grid-template-columns: repeat(2, 1fr);-->
<!--    grid-gap: 2em;-->

<!--    .span {-->
<!--        grid-column: span 2;-->
<!--    }-->
<!--}-->

<!--</style>-->
