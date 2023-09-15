<InputWrapper
  {label}
  focus={focussed}
  active={focussed || value !== ''}
>
  <textarea
    bind:value
    on:focus={() => focussed = true}
    on:blur={() => focussed = false}
  ></textarea>
</InputWrapper>

<script lang="ts">
// Components
import InputWrapper from "@/components/common/InputWrapper.svelte";
import FormValue from "@/components/common/Form/FormValue";

// Props
export var name: string | undefined;
export var formDefault: string | undefined;
export var label: string;
export var value: string = "";
export var full: boolean = false;

// Data
let focussed = false;

// On mount
new FormValue<string | number | null>({
  name,
  getValue: () => value ?? "",
  reset() {
    value = formDefault ?? "";
  }
});
</script>

<style lang="scss">
@use "../../scss/dp";
@use "../../scss/color";
@use "../../scss/typescale";

textarea {
    width: 100%;
    padding: dp.dp(16);
    box-sizing: border-box;

    resize: none;
    border: 0;
    outline: 0;
    color: color.use(--md-sys-color-on-surface);
    background-color: inherit;
    border-radius: inherit;

    @include typescale.use-scale(body-large);
}

</style>
