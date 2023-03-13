<span {style}>
  {#if icon}
    <ExternalAccountIcon />
  {/if}

  {accountName}
</span>

<script lang="ts">
// Imports
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";

// Components
import textColorBasedOnHex from "@/utils/textForBackground";
import ExternalAccountIcon from "@/components/icons/ExternalAccountIcon.svelte";

// Props
export var externalAccount: ExternalAccountDTO | null;
export var externalAccountName: string;
export var icon = true;

// Computed
$: accountName = externalAccount?.name ?? externalAccountName;
$: backgroundColor = externalAccount?.hexColor ?? "f1f1f1";
$: foregroundColor = textColorBasedOnHex(backgroundColor);
$: style = `background-color: #${backgroundColor}; color: #${foregroundColor};`
</script>

<style lang="scss">

span {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-tiny);
    background-color: #f1f1f1;
}

</style>
