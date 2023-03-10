<Page>
  <AsyncContent {promise}>
    <div class="grid">
      <Card>
        <h1>
          <CategorySpan {category} />
        </h1>

        <p>
          {category.description}
        </p>
      </Card>

      <Card>
        <CardStat label="Current total">
          {formatMoney(category.amount)}
        </CardStat>
      </Card>

      <div class="span">
        <Card>
          <AsyncButton asyncClick={deleteCategory} --accent-color="var(--negative-amount-on-bg)">
            <DeleteIcon />
            Delete category
          </AsyncButton>
        </Card>
      </div>
    </div>
  </AsyncContent>
</Page>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoryService from "@/services/CategoryService";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/common/Card.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import CategorySpan from "@/components/CategorySpan.svelte";
import AmountSpan from "@/components/AmountSpan.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import formatMoney from "@/utils/formatMoney";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import DeleteIcon from "@/components/icons/DeleteIcon.svelte";
import { push } from "svelte-spa-router";

// Props
export var params: { id: string } = {};

// Data
const categoriesService = new CategoryService();
let promise: Promise<unknown>;
let category: CategoryDTO;

// Functions
async function refresh() {
    category = await categoriesService.getCategoryById(params.id);
}

async function deleteCategory() {
    if (confirm("Are you sure you want to delete this category?")) {
        await categoriesService.deleteCategory(category.id);
        await push("/categories");
    }
}

promise = refresh();
</script>

<style lang="scss">

h1 {
    margin: 0;
    font-size: 2em;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;

    .span {
        grid-column: span 2;
    }
}

</style>
