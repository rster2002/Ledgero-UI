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
@use "../../scss/typescale";
@use "../../scss/color";

span {
    padding: 0.2em 0.5em;

    border-radius: var(--md-sys-shape-corner-full);
    background-color: var(--positive-amount);
    color: color.use(--md-sys-color-surface);

    @include typescale.use-scale(label-large);

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
