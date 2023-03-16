<Input label="Name" bind:value={value.name} />
<Input label="Description" bind:value={value.description} />
<ColorPicker bind:value={value.hexColor} />

<script lang="ts">
// Imports
import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";

// Components
import Input from "@/components/common/Input.svelte";
import ColorPicker from "@/components/common/ColorPicker.svelte";

// Props
export var value: CategoryDetailsDTO = {
    name: "New category",
    description: "",
    hexColor: "ff3030",
};
</script>
