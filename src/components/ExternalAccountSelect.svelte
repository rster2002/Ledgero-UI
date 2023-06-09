<AsyncContent {promise}>
  <Select {label} bind:value={path}>
    <ExternalAccountSpan
      slot="selected"
      externalAccount={currentExternalAccount}
      {externalAccountName}
    />

    <Option value={null}>
      <ExternalAccountSpan
        {externalAccountName}
      />
    </Option>

    {#each externalAccounts as externalAccount}
      <Option value={externalAccount.id}>
        <ExternalAccountSpan {externalAccount} />
      </Option>
    {/each}
  </Select>
</AsyncContent>

<script lang="ts">
// Imports
import ExternalAccountService from "@/services/ExternalAccountService";
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";

// Components
import AsyncContent from "@/components/common/AsyncContent.svelte";
import Select from "@/components/common/Select.svelte";
import Option from "@/components/common/Select/Option.svelte";
import ExternalAccountSpan from "@/components/spans/ContactSpan.svelte";

// Props
export var label: string = "External account";
export var externalAccountName: string | undefined;
export var externalAccountId: string | null;

// Data
const externalAccountService = new ExternalAccountService();
let externalAccounts: ExternalAccountDTO[] = [];
let path: [string | null] = [externalAccountId];

// Computed
$: [externalAccountId] = path;
$: currentExternalAccount = externalAccounts.find(externalAccount => externalAccount.id === externalAccountId) ?? null;

// Functions
async function refresh() {
    externalAccounts = await externalAccountService.getAllExternalAccounts();
}

const promise = refresh();
</script>
