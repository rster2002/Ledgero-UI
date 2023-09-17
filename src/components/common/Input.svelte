<InputWrapper
  {label}
  {full}
  {supporting}
  {error}
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
export var supporting: string | undefined;
export var error: string | undefined;
export var value: string | number | null;
export var full: boolean = false;
export var required: boolean = false;
export var minLength: number | undefined;
export var maxLength: number | undefined;

// Data
let focussed = false;

// Functions
function validateText(value: string) {
  if (required && value === "") {
    return "This field is required";
  }

  if (minLength && value.length < minLength) {
    return `Text must have at least ${minLength} characters`;
  }

  if (maxLength && value.length > maxLength) {
    return `Text can only contain ${minLength} characters`;
  }
}

// On mount
new FormValue<string | number | null>({
  name,
  getValue: () => value ?? "",
  onError: message => error = message,
  reset: () => value = formDefault,
  validate: value => {
    const type = $$props.type ?? "text";

    if (type === "text") {
      return validateText(<string> value);
    }
  },
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
