<header>
  <h2>
    <AmountSpan amount={transaction.completeAmount} />
  </h2>
  <h3>
    {formatDate(transaction.date, {
        dateStyle: "long",
    })}
  </h3>
</header>

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import formatDate from "@/utils/formatDate";

// Components
import AmountSpan from "@/components/AmountSpan.svelte";

// Props
export var transaction: TransactionDTO;
</script>

<style lang="scss">

h2, h3 {
    text-align: center;
}

h2 {
    font-size: 1.7em;
    font-family: var(--header-face);
}

h3 {
    font-size: 1em;
    color: var(--low-on-background);
}

</style>
