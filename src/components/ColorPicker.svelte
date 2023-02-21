<div class="colorPicker">
  <button class="display" style="background-color: #{value}; color: #{textColor};" on:click={onClick}>
    <span class="label">{label}</span>
    {value}
  </button>

  <input type="color" bind:this={el} on:change={onChange} />
</div>

<script lang="ts">
// Props
import textColorBasedOnHex from "@/utils/textForBackground";

export var label: string = "Color";
export var value: string = "ffffff";

// Data
let el: HTMLInputElement = null;

// Computed
$: setNewValue(value);
$: textColor = textColorBasedOnHex(value);

// Functions
function onChange(event: InputEvent) {
    value = el.value.replace("#", "");
}

function setNewValue(value: string) {
    if (el === null) {
        return;
    }

    if (value !== el.value.replace("#", "")) {
        el.value = `#${value}`;
    }
}

function onClick() {
    el.click();
}
</script>

<style lang="scss">

.colorPicker {
    margin-top: 1em;

    .display {
        height: 6em;
        width: 12em;

        position: relative;

        border: 2px solid var(--text-on-background);
        border-radius: var(--border-radius-small);
        font-family: var(--font-family);
        font-weight: 700;

        .label {
            position: absolute;
            padding: 0 0.3em;
            left: 0.5em;
            top: -1.5em;

            background-color: var(--background);
            cursor: text;
            color: var(--text-on-background);
        }
    }

    input {
        height: 0;
        width: 0;
        visibility: hidden;
        //display: none;
    }
}

</style>
