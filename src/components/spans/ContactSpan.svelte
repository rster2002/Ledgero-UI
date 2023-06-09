<Chip color={accountColor}>
  {#if icon}
    {#if externalAccount}
      <ContactIcon />
    {:else}
      <NoContactIcon />
    {/if}
  {/if}

  {accountName}
</Chip>

<script lang="ts">
// Imports
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import textColorBasedOnHex from "@/utils/textForBackground";

// Components
import Chip from "@/components/spans/Chip.svelte";
import NoContactIcon from "@/components/icons/NoContactIcon.svelte";
import ContactIcon from "@/components/icons/ContactIcon.svelte";

// Props
export var externalAccount: ExternalAccountDTO | null;
export var externalAccountName: string | undefined;
export var icon = true;

// Computed
$: accountName = externalAccount?.name ?? externalAccountName ?? "No external account";
$: accountColor = externalAccount?.hexColor ?? "f1f1f1";
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
