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

        </Card>
      </div>
    </div>
  </AsyncContent>
</Page>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import CategoriesService from "@/services/CategoriesService";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/Card.svelte";
import PageHeader from "@/components/fragments/PageHeader.svelte";
import AsyncContent from "@/components/AsyncContent.svelte";
import CategorySpan from "@/components/CategorySpan.svelte";
import AmountSpan from "@/components/AmountSpan.svelte";
import CardStat from "@/components/fragments/CardStat.svelte";
import formatMoney from "@/utils/formatMoney";

// Props
export var params: { id: string } = {};

// Data
const categoriesService = new CategoriesService();
let promise: Promise<unknown>;
let category: CategoryDTO;

// Functions
async function refresh() {
    category = await categoriesService.getCategoryById(params.id);
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
