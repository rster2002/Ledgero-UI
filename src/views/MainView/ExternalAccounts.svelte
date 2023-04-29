<Page>
  <PageHeader>
    <h1>
      <ExternalAccountIcon />
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
          on:click={() => push(`/categories/${externalAccount.id}`)}
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
    <Input label="Name" bind:value={newExternalAccount.name} />
    <Input label="Description" bind:value={newExternalAccount.description} />
    <ColorPicker bind:value={newExternalAccount.hexColor} />

    <CategorySelect
      bind:categoryId={newExternalAccount.defaultCategoryId}
      bind:subcategoryId={newExternalAccount.defaultSubcategoryId}
    />

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
import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoryService from "@/services/CategoryService";

// Components
import Page from "@/components/Page.svelte";
import AddIcon from "@/components/icons/AddIcon.svelte";
import Popup from "@/components/common/Popup.svelte";
import NewCategoryForm from "@/components/forms/CategoryDetailsForm.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";
import DragAndDropSort from "@/components/DragAndDropSort.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import AmountGridItem from "@/components/fragments/AmountGridItem.svelte";
import { push } from "svelte-spa-router";
import GridNewButton from "@/components/fragments/GridNewButton.svelte";
import ExternalAccountIcon from "@/components/icons/ExternalAccountIcon.svelte";
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import ExternalAccountService from "@/services/ExternalAccountService";
import Input from "@/components/common/Input.svelte";
import type ExternalAccountDetailsDTO from "@/models/dto/externalAccounts/ExternalAccountDetailsDTO";
import ColorPicker from "@/components/common/ColorPicker.svelte";
import CategorySelect from "@/components/CategorySelect.svelte";

// Data
const externalAccountService = new ExternalAccountService();
let orderChanged = false;
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
