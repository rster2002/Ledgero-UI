<InputWrapper {label} let:id>
  <input placeholder=" " {id} {...$$props} bind:value />
</InputWrapper>

<script lang="ts">
// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";

// Props
export var label: string;
export var value;

// Data
const id = String(Math.random());
</script>

<style lang="scss">

input {
    width: 100%;

    padding: 0.75em;
    box-sizing: border-box;

    border: 0;
    outline: 0;
    border-radius: inherit;
}

</style>
