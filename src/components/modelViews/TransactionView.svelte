<div class="transactionView">
  <AsyncContent {promise}>
    <div class="buttons">
      {#if !editing}
        <IconButton on:click={() => editing = true}>
          <EditIcon />
        </IconButton>
      {:else}
        <IconButton on:click={() => editing = false}>
          <UndoIcon />
        </IconButton>

        <IconButton on:click={() => editing = false}>
          <SaveIcon />
        </IconButton>
      {/if}
    </div>

    <TransactionHeader transaction={transaction} />

    {#if !editing}
      <VLayout>
        <IconSection center>
          <CategoryIcon slot="icon" />
          <CategorySpan category={transaction.category} icon={false} />
        </IconSection>

        <IconSection center>
          <BankAccountIcon slot="icon" />
          <BankAccountSpan bankAccount={transaction.bankAccount} icon={false} />
        </IconSection>

        <IconSection>
          <TextIcon slot="icon" />
          {transaction.description}
        </IconSection>
      </VLayout>
    {:else}
      <VLayout>
        <IconSection center>
          <CategoryIcon slot="icon" />
          <Select
            bind:value={newCategory}
            let:item items={categories}
            searchKey={x => x !== null ? x.name : 'No category'}
          >
            <CategorySpan category={item} />
            <CategorySpan category={item} slot="currentValue" icon={false} />
          </Select>
        </IconSection>

        <IconSection>
          <TextIcon slot="icon" />
          <textarea spellcheck="false" bind:value={newDescription}></textarea>
        </IconSection>
      </VLayout>
    {/if}
  </AsyncContent>
</div>

<script lang="ts">
// Imports
import TransactionService from "@/services/TransactionService";
import CategoryService from "@/services/CategoryService";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Components
import TransactionHeader from "@/components/fragments/TransactionHeader.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import IconSection from "@/components/common/IconSection.svelte";
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import Select from "@/components/common/Select.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import BankAccountSpan from "@/components/spans/BankAccountSpan.svelte";
import TextIcon from "@/components/icons/TextIcon.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import IconButton from "@/components/common/IconButton.svelte";
import EditIcon from "@/components/icons/EditIcon.svelte";
import UndoIcon from "@/components/icons/UndoIcon.svelte";
import SaveIcon from "@/components/icons/SaveIcon.svelte";

// Props
export var transaction: TransactionDTO;

// Data
const transactionsService = new TransactionService();
const categoriesService = new CategoryService();
let categories: CategoryDTO[] = [];
let editing = false;
let newCategory = transaction.category;
let newDescription = transaction.description;

// Functions
async function refresh() {
    categories = await categoriesService.getAllCategories()
}

async function save() {

}

// function onCategoryChange(event: CustomEvent) {
//     let newCategory: CategoryDTO | null = event.detail;
//
//     if (transaction.category === null && newCategory === null) {
//         return;
//     }
//
//     if (transaction.category !== null && transaction.category.id === newCategory.id) {
//         return;
//     }
//
//     transactionsService.updateCategory(
//         transaction.id,
//         newCategory.id,
//         null
//     )
//         .then(() => {
//             transaction.category = newCategory;
//             dispatch("change", event.detail);
//         });
// }

const promise = refresh();
</script>

<style lang="scss">

.transactionView {
    position: relative;

    padding-top: 1px;

    .buttons {
        position: absolute;
        top: 0;
        right: 0;
    }
}

textarea {
    width: 100%;
    resize: none;

    padding: 0.3em;
    box-sizing: border-box;

    font-family: var(--font-family);
    font-size: 1em;
    outline: 0;
    border: 2px solid var(--low-on-background);
    border-radius: var(--border-radius-tiny);
}

</style>
