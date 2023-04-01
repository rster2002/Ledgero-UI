<PaginationTable
  {paginator}
  on:click={(e) => openTransaction(e.detail)}
  clickable
>
  <svelte:fragment slot="header">
    <TableHead>Amount</TableHead>

    {#if showCategory}
      <TableHead>Category</TableHead>
    {/if}


    <TableHead wide>Description</TableHead>
    <TableHead />
  </svelte:fragment>

  <svelte:fragment slot="row" let:item>
    <TextColumn>
      <AmountSpan amount={item.completeAmount} sign />
    </TextColumn>

    {#if showCategory}
      <TextColumn>
        <FullCategorySpan category={item.category} subcategory={item.subcategory} />
      </TextColumn>
    {/if}

    <TextColumn>
      {item.description}
    </TextColumn>

    <CenterColumn>
      <ArrowRightIcon />
    </CenterColumn>
  </svelte:fragment>
</PaginationTable>

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import { push } from "svelte-spa-router";

// Components
import PaginationTable from "@/components/PaginationTable.svelte";
import TableHead from "@/components/Table/TableHead.svelte";
import TextColumn from "@/components/Table/TextColumn.svelte";
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import FullCategorySpan from "@/components/spans/FullCategorySpan.svelte";
import CenterColumn from "@/components/Table/CenterColumn.svelte";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.svelte";

// Props
export var paginator: AsyncIterator<TransactionDTO[]>;
export var showCategory = true;

// Functions
function openTransaction(transaction: TransactionDTO) {
    push(`/transactions/${transaction.id}`);
}
</script>
