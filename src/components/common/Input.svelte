<InputWrapper
  {label}
  focus={focussed}
  active={focussed || value !== ''}
  let:id
>
  <input placeholder=" " {id} {...$$props} bind:value on:focus={() => focussed = true} on:blur={() => focussed = false} />
</InputWrapper>

<script lang="ts">
// Components
import InputWrapper from "@/components/fragments/InputWrapper.svelte";

// Props
export var label: string;
export var value;

// Data
const id = String(Math.random());
let focussed = false;
</script>

<style lang="scss">
@import "../../shared";

input {
    width: 100%;

    padding: 0.75em;
    box-sizing: border-box;

    border: 0;
    outline: 0;
    border-radius: inherit;
    background-color: inherit;
    color: var(--md-sys-color-on-surface);
    @include mdl-font(body-large);
}

</style>
