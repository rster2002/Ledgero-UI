<ListItem clickable on:click>
  {#if transaction.externalAccount}
    {transaction.externalAccount.name}
    <ContactIcon />
  {:else}
    {transaction.externalAccountName}
  {/if}

  <svelte:fragment slot="supporting">
    {transaction.description}
  </svelte:fragment>

  <AmountSpan slot="tailing" amount={transaction.amount} />
</ListItem>

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import FullCategorySpan from "@/components/spans/FullCategorySpan.svelte";
import ContactIcon from "@/components/icons/ContactIcon.svelte";
import ListItem from "@/components/ListItem.svelte";

// Props
export var transaction: TransactionDTO;
</script>

<style lang="scss">
@import "../shared";

.transactionListItem {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    gap: dp(16);
    padding: dp(8) dp(24) dp(8) dp(16);
    box-sizing: border-box;

    border-bottom: dp(1) var(--md-sys-color-surface-variant) solid;
    cursor: pointer;

    &:hover {
        background-color: rgb(var(--md-sys-color-on-surface-rgb) / var(--md-sys-state-hover-state-layer-opacity));
    }

    .headline {
        margin: 0;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

        @include mdl-font(body-large);
    }

    .supportingText {
        margin: 0;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        @include mdl-font(body-medium);
    }

    .amount :global(span) {
        display: block;
    }
}

</style>
