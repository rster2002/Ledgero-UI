<Input
  label="Name"
  bind:value={value.name}
/>

<Input
  label="Description"
  bind:value={value.description}
/>

<ColorPicker
  label="Color"
  bind:value={value.hexColor}
/>

<CategorySelect
  label="Default category"
  bind:categoryId={value.defaultCategoryId}
  bind:subcategoryId={value.defaultSubcategoryId}
/>

<script lang="ts">
// Imports
import type ExternalAccountDetailsDTO from "@/models/dto/externalAccounts/ExternalAccountDetailsDTO";

// Components
import Input from "@/components/common/Input.svelte";
import ColorPicker from "@/components/common/ColorPicker.svelte";
import CategorySelect from "@/components/CategorySelect.svelte";

// Props
export var value: ExternalAccountDetailsDTO = {
    name: "New external account",
    description: "",
    hexColor: "ff3030",
    defaultCategoryId: null,
    defaultSubcategoryId: null,
};
</script>
