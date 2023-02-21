<Input label="Name" bind:value={value.name} />
<Input label="Description" bind:value={value.description} />
<ColorPicker bind:value={value.hexColor} />

<!--<Input label="Color" type="color" bind:value={value.hexColor} />-->

<script lang="ts">
// Imports
import type NewCategoryDTO from "@/models/dto/categories/NewCategoryDTO";

// Components
import Input from "@/components/Input.svelte";
import ColorPicker from "@/components/ColorPicker.svelte";

// Props
export var value: NewCategoryDTO = {
    name: "New category",
    description: "",
    hexColor: "ff3030",
};
</script>
