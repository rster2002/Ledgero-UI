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
        <CardStat label="Net">
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

          <PaginationTable paginator={transactionsIterator}>
            <svelte:fragment slot="header">
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead wide>Description</TableHead>
            </svelte:fragment>

            <svelte:fragment slot="row" let:item>
              <TextColumn>
                <AmountSpan amount={item.amount} sign />
              </TextColumn>
              <TextColumn>
                <CategorySpan category={item.category} navigation />
              </TextColumn>
              <TextColumn>{item.description}</TextColumn>
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
import TransactionsService from "@/services/TransactionsService";
import formatMoney from "@/utils/formatMoney";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/Card.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import AsyncContent from "@/components/AsyncContent.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import AmountSpan from "@/components/AmountSpan.svelte";
import CategorySpan from "@/components/CategorySpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import UploadIcon from "@/components/icons/UploadIcon.svelte";
import Button from "@/components/Button.svelte";
import PaginationTable from "@/components/PaginationTable.svelte";
import Popup from "@/components/Popup.svelte";
import { push } from "svelte-spa-router";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import TransactionsIcon from "@/components/icons/TransactionsIcon.svelte";

// Data
const aggregateService = new AggregateService();
const transactionsService = new TransactionsService();
const transactionsIterator = transactionsService.createTransactionsIterator();
let total: number = 0;

// Functions
async function create() {
    total = await aggregateService.getNetWorth();
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
