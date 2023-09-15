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
import FormValue from "@/components/common/Form/FormValue";

// Props
export var name: string | undefined;
export var formDefault: string | undefined;
export var label: string;
export var value: string | number | null;
export var full: boolean = false;
export var minLength: number | undefined;
export var maxLength: number | undefined;

// Data
let focussed = false;

// On mount
new FormValue<string | number | null>({
  name,
  getValue: () => value ?? "",
  reset() {
    value = formDefault;
  }
});
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
