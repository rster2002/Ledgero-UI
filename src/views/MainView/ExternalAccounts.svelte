<Page>
  <PageHeader>
    <h1>
      <ContactsIcon />
      External accounts
    </h1>

    <p>
      Manage external accounts.
    </p>
  </PageHeader>

  <AsyncContent {promise}>
    <div class="grid">
      {#each externalAccounts as externalAccount}
        <AmountGridItem
          on:click={() => push(`/external-accounts/${externalAccount.id}`)}
          item={{
            name: externalAccount.name,
            description: externalAccount.description,
            hexColor: externalAccount.hexColor,
          }}
        />
      {/each}

      <GridNewButton on:click={() => newPopupOpen = true}>
        <AddIcon />
        New external account
      </GridNewButton>
    </div>
  </AsyncContent>
</Page>

<Popup bind:open={newPopupOpen}>
  <VLayout>
    <ExternalAccountDetailsForm bind:value={newExternalAccount} />

    <div>
      <AsyncButton asyncClick={createExternalAccount}>
        Create external account
      </AsyncButton>
    </div>
  </VLayout>
</Popup>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import { push } from "svelte-spa-router";
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import ExternalAccountService from "@/services/ExternalAccountService";
import type ExternalAccountDetailsDTO from "@/models/dto/externalAccounts/ExternalAccountDetailsDTO";

// Components
import Page from "@/components/Page.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
import Popup from "@/components/common/Popup.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import AmountGridItem from "@/components/fragments/AmountGridItem.svelte";
import GridNewButton from "@/components/fragments/GridNewButton.svelte";
import ExternalAccountDetailsForm from "@/components/forms/ExternalAccountDetailsForm.svelte";
import ContactsIcon from "@/components/icons/ContactsIcon.svelte";

// Data
const externalAccountService = new ExternalAccountService();
let successMessage = [""];
let errorMessage = [""];
let newPopupOpen = false;
let externalAccounts: ExternalAccountDTO[] = [];
let promise: Promise<unknown>;
let newExternalAccount: ExternalAccountDetailsDTO = {
    name: "New external account",
    description: "A brand new external account",
    hexColor: "ffffff",
    defaultCategoryId: null,
    defaultSubcategoryId: null,
};

// Functions
async function refresh() {
    externalAccounts = await externalAccountService.getAllExternalAccounts();
}

async function createExternalAccount() {
    try {
        await externalAccountService.createExternalAccount(newExternalAccount);

        successMessage = ["Category created"];
        newPopupOpen = false;
        await refresh();

        newExternalAccount = {
            name: "New external account",
            description: "A brand new external account",
            hexColor: "ffffff",
            defaultCategoryId: null,
            defaultSubcategoryId: null,
        };
    } catch (e) {
        errorMessage = ["Failed to create category"];
    }
}

promise = refresh();
</script>

<style lang="scss">

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 2em;
    justify-content: center;
}

</style>
