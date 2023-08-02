<InputWrapper
  {label}
  {full}
  focus={focussed}
  active={focussed || (value !== '' && value !== null && value !== undefined)}
  let:id
>
  <input placeholder=" " {id} {...$$props} bind:value on:focus={() => focussed = true} on:blur={() => focussed = false} />
</InputWrapper>

<script lang="ts">
// Components
import InputWrapper from "./InputWrapper.svelte";

// Props
export var label: string;
export var value: unknown;
export var full: boolean = false;

// Data
let focussed = false;
</script>

<style lang="scss">
@use "../../scss/color";
@use "../../scss/typescale";

input {
    width: 100%;

    padding: 0.75em;
    box-sizing: border-box;

    border: 0;
    outline: 0;
    border-radius: inherit;
    background-color: inherit;
    color: color.use(--md-sys-color-on-surface);

    @include typescale.use-scale(body-large);
}

</style>
