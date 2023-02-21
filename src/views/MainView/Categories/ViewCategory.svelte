<Page>
  <Card>
    <AsyncContent {promise}>
      <PageHeader>
        <h1>
          <CategorySpan {category} />
        </h1>
        <p>
          <b>Description</b>: {category.description}
        </p>
      </PageHeader>
    </AsyncContent>
  </Card>
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
