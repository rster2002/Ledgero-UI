<Page>
  <PageHeader>
    <h1>
      <TransactionsIcon />
      Transactions
    </h1>
  </PageHeader>

  <div class="grid">
    <Card>
      <AsyncContent {promise}>
        <CardStat label="Net worth">
          {formatMoney(total)}
        </CardStat>
      </AsyncContent>
    </Card>

    <Card>

    </Card>

    <div class="span">
      <Card>
        <VLayout>
          <HLayout>
            <Button on:click={() => push("/transactions/upload")}>
              <UploadIcon />
              Upload CSV
            </Button>
          </HLayout>

          <PaginationTable
            paginator={transactionsIterator}
            on:click={(e) => openTransaction(e.detail)}
            bind:updateFn={updateFn}
            clickable
          >
            <svelte:fragment slot="header">
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead wide>Description</TableHead>
              <TableHead />
            </svelte:fragment>

            <svelte:fragment slot="row" let:item>
              <TextColumn>
                <AmountSpan amount={item.completeAmount} sign />
              </TextColumn>

              <TextColumn>
                <CategorySpan category={item.category} />
              </TextColumn>

              <TextColumn>
                {item.description}
              </TextColumn>

              <CenterColumn>
                <ArrowRightIcon />
              </CenterColumn>
            </svelte:fragment>
          </PaginationTable>
        </VLayout>
      </Card>
    </div>
  </div>
</Page>

<script lang="ts">
// Imports
import AggregateService from "@/services/AggregateService";
import TransactionService from "@/services/TransactionService";
import formatMoney from "@/utils/formatMoney";
import { push } from "svelte-spa-router";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoryService from "@/services/CategoryService";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/common/Card.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import UploadIcon from "@/components/icons/UploadIcon.svelte";
import Button from "@/components/common/Button.svelte";
import PaginationTable from "@/components/PaginationTable.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import TransactionsIcon from "@/components/icons/TransactionsIcon.svelte";
import CenterColumn from "@/components/Table/CenterColumn.svelte";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.svelte";

// Data
const aggregateService = new AggregateService();
const transactionsService = new TransactionService();
const categoriesService = new CategoryService();
const transactionsIterator = transactionsService.createTransactionsIterator();
let updateFn;
let categories: CategoryDTO[] = [];
let total: number = 0;

// Functions
async function create() {
    categories = await categoriesService.getAllCategories();
    categories.unshift(null);
    total = await aggregateService.getNetWorth();
}

function openTransaction(transaction: TransactionDTO) {
    push(`/transactions/${transaction.id}`);
}

const promise = create();
</script>

<style lang="scss">

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;

    .span {
        grid-column: span 2;
    }
}

</style>
