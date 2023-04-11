<Page>
  <PageHeader>
    <h1>
      <BankAccountIcon />
      Bank accounts
    </h1>

    <p>
      View and manage your bank accounts. Bank accounts are automatically created when importing transactions.
    </p>
  </PageHeader>

  <AsyncContent {promise}>
    <div class="grid">
      {#each bankAccounts as bankAccount}
        <AmountGridItem
          on:click={() => push(`/bank-accounts/${bankAccount.id}`)}
          item={{
            name: bankAccount.name,
            description: bankAccount.description,
            hexColor: bankAccount.hexColor,
            amount: bankAccount.amount,
          }}
        />
      {/each}
    </div>
  </AsyncContent>
</Page>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";
import BankAccountService from "@/services/BankAccountService";

// Components
import Page from "@/components/Page.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import AmountGridItem from "@/components/fragments/AmountGridItem.svelte";
import { push } from "svelte-spa-router";

// Data
const bankAccountService = new BankAccountService();
let successMessage = [""];
let errorMessage = [""];
let bankAccounts: BankAccountDTO[] = [];
let promise: Promise<unknown>;

// Functions
async function refresh() {
    bankAccounts = await bankAccountService.getAllBankAccounts();
}

promise = refresh();
</script>

<style lang="scss">

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 2em;
    justify-content: center;

    button {
        min-height: 200px;

        background-color: transparent;
        border: 2px solid var(--accent-color);
        border-radius: var(--border-radius-medium);
        color: var(--accent-color);
        font-family: var(--header-face);
        cursor: pointer;
        transition: 150ms all var(--standard-easing);

        span {
            font-size: 1.5em;
        }

        &:hover {
            background-color: var(--accent-color);
            color: var(--text-on-accent);
        }
    }
}

</style>
