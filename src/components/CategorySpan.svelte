<span style={style}>
  {categoryName}
</span>

<script lang="ts">
// Imports
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import textColorBasedOnHex from "@/utils/textForBackground";

// Props
export var category: CategoryDTO | null;

// Computed
$: categoryName = category?.name ?? "No category";
$: backgroundColor = category?.hexColor ?? "f1f1f1";
$: foregroundColor = textColorBasedOnHex(backgroundColor);
$: style = `background-color: #${backgroundColor}; color: #${foregroundColor};`
</script>

<style lang="scss">

span {
    padding: 0.2em 0.5em;

    font-family: var(--header-face);
    border-radius: var(--border-radius-round);
    background-color: #f1f1f1;
}

</style>
