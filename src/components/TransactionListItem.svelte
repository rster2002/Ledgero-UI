<div class="transactionListItem" on:click>


  <div class="text">
    <p class="headline">
      {#if transaction.externalAccount}
        {transaction.externalAccount.name}
        <ExternalAccountIcon />
      {:else}
        {transaction.externalAccountName}
      {/if}
    </p>
    <p class="supportingText">{transaction.description}</p>
  </div>

  <div class="amount">
    <AmountSpan amount={transaction.amount} sign />
  </div>
</div>

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import AmountSpan from "@/components/spans/AmountSpan.svelte";
import ExternalAccountIcon from "@/components/icons/ExternalAccountIcon.svelte";

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

    border-bottom: dp(1) var(--tint-50) solid;
    cursor: pointer;

    &:hover {
        background-color: var(--tint-50);
    }

    .headline {
        margin: 0;

        @include mdl-font(body-large);
    }

    .supportingText {
        margin: 0;

        @include mdl-font(body-medium);
    }

    .amount :global(span) {
        display: block;
    }
}

</style>
