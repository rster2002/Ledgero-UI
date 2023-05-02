<span {style}>
  {#if icon}
    {#if externalAccount}
      <ExternalAccountIcon />
    {:else}
      <NoExternalAccountIcon />
    {/if}
  {/if}

  {accountName}
</span>

<script lang="ts">
// Imports
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import textColorBasedOnHex from "@/utils/textForBackground";

// Components
import ExternalAccountIcon from "@/components/icons/ExternalAccountIcon.svelte";
import NoExternalAccountIcon from "@/components/icons/NoExternalAccountIcon.svelte";

// Props
export var externalAccount: ExternalAccountDTO | null;
export var externalAccountName: string | undefined;
export var icon = true;

// Computed
$: accountName = externalAccount?.name ?? externalAccountName ?? "No external account";
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
