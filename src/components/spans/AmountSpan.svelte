<span class="{amount < 0 && 'negative'} {background && 'background'}">
  {amountText}
</span>

<script lang="ts">
// Imports
import formatMoney from "@/utils/formatMoney";

// Props
export var amount: number;
export var sign: boolean = false;
export var background: boolean = false;

// Computed
$: amountText = formatMoney(amount, {
    signDisplay: sign ? "always" : "auto",
});
</script>

<style lang="scss">

span {
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-full);
    background-color: var(--positive-amount);
    color: var(--md-ref-palette-neutral20);

    &.negative {
        background-color: var(--negative-amount);
    }

    &.background {
        background-color: var(--background);
        color: var(--positive-amount-on-bg);

        &.negative {
            color: var(--negative-amount-on-bg)
        }
    }
}

</style>
