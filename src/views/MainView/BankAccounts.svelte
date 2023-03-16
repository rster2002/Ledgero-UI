<Page>
  <PageHeader>
    <h1>
      <BankAccountIcon />
      Bank accounts
    </h1>

    <p>
      View and manage your bank accounts. Bank accounts are automatically added when importing transactions.
    </p>

<!--    <div class="buttons" slot="right">-->
<!--      {#if orderChanged}-->
<!--        <AsyncButton asyncClick={saveOrdering}>-->
<!--          <SaveIcon />-->
<!--          Save ordering-->
<!--        </AsyncButton>-->
<!--      {/if}-->
<!--    </div>-->
  </PageHeader>

  <AsyncContent {promise}>
    <div class="grid">
      {#each bankAccounts as bankAccount}
        <AmountGridItem item={{
            name: bankAccount.name,
            description: bankAccount.description,
            hexColor: bankAccount.hexColor,
            amount: bankAccount.amount,
        }} />
      {/each}
    </div>
  </AsyncContent>
</Page>

<!--<Popup bind:open={newPopupOpen}>-->
<!--  <VLayout>-->
<!--    <NewCategoryForm bind:value={newCategory} />-->

<!--    <div>-->
<!--      <AsyncButton asyncClick={createCategory}>-->
<!--        Create category-->
<!--      </AsyncButton>-->
<!--    </div>-->
<!--  </VLayout>-->
<!--</Popup>-->

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
import CategoryGridItem from "@/components/fragments/AmountGridItem.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";
import DragAndDropSort from "@/components/DragAndDropSort.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import AmountGridItem from "@/components/fragments/AmountGridItem.svelte";
import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";
import BankAccountService from "@/services/BankAccountService";
import GridNewButton from "@/components/fragments/GridNewButton.svelte";

// Data
const bankAccountService = new BankAccountService();
let orderChanged = false;
let successMessage = [""];
let errorMessage = [""];
let newPopupOpen = false;
let bankAccounts: BankAccountDTO[] = [];
let promise: Promise<unknown>;

// Functions
async function refresh() {
    bankAccounts = await bankAccountService.getAllBankAccounts();
}

// async function saveOrdering() {
//     try {
//         await categoriesService.saveOrdering(categories.map(i => i.id));
//         orderChanged = false;
//         successMessage = ["Ordering saved"];
//     } catch (e) {
//         errorMessage = ["Failed to save ordering"];
//     }
// }

// async function createCategory() {
//     try {
//         await categoriesService.createCategory(newCategory);
//         successMessage = ["Category created"];
//         newPopupOpen = false;
//         await refresh();
//         newCategory = {
//             name: "New category",
//             description: "A brand new category",
//             hexColor: "ffffff",
//         };
//     } catch (e) {
//         errorMessage = ["Failed to create category"];
//     }
// }

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
