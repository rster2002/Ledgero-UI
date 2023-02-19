<p class="{errorMessage !== '' && 'visible'}">
    <ErrorIcon />
    {errorMessage}
</p>

<script lang="ts">
// Components
import ErrorIcon from "@/components/icons/ErrorIcon.svelte";

// Props
export var error: Error | null;

// Computed
$: errorMessage = getErrorMessage(error);

// Functions
function getErrorMessage(error: Error | null) {
    if (error === null) {
        return "";
    }

    return error.message;
}
</script>

<style lang="scss">

p {
    margin: 0;

    visibility: hidden;
    color: var(--error-color);

    &.visible {
        visibility: visible;
    }
}

</style>
