<script lang="ts">
// Imports
import type UpdateTransactionDetailsDTO from "@/models/dto/transactions/UpdateTransactionDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";

// Props
export var updateDetails: UpdateTransactionDetailsDTO;

// Data
let selectedCategory: CategoryDTO = null;
</script>
