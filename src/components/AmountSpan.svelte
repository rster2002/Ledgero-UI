<span class="{amount < 0 && 'negative'}">
  {amountText}
</span>

<script lang="ts">
// Imports
import formatMoney from "@/utils/formatMoney";

// Props
export var amount: number;
export var sign: boolean = false;

// Computed
$: amountText = formatMoney(amount, {
    signDisplay: sign ? "always" : "auto",
});
</script>

<style lang="scss">

span {
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-round);
    background-color: #a9f59f;

    &.negative {
        background-color: #ffc4c4;
    }
}

</style>
