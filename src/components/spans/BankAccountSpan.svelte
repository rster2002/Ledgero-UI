<Chip color={bankAccount.hexColor}>
  {#if icon}
    <BankAccountIcon />
  {/if}

  {bankAccount.name}
</Chip>

<script lang="ts">
// Imports
import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";

// Components
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import textColorBasedOnHex from "@/utils/textForBackground";
import Chip from "@/components/spans/Chip.svelte";

// Props
export var bankAccount: BankAccountDTO;
export var icon = true;
</script>

<style lang="scss">

span {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-full);
    background-color: #f1f1f1;
}

</style>
