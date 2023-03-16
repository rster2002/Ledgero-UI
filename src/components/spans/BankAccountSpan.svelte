<span {style}>
  {#if icon}
    <BankAccountIcon />
  {/if}

  {bankAccount.name}
</span>

<script lang="ts">
// Imports
import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";

// Components
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import textColorBasedOnHex from "@/utils/textForBackground";

// Props
export var bankAccount: BankAccountDTO;
export var icon = true;

// Computed
$: foregroundColor = textColorBasedOnHex(bankAccount.hexColor);
$: style = `background-color: #${bankAccount.hexColor}; color: #${foregroundColor};`
</script>

<style lang="scss">

span {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-round);
    background-color: #f1f1f1;
}

</style>
