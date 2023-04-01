<div class="inputWrapper {padding && 'padding'} {pointer && 'pointer'}" on:click>
  <slot {id} />
  <label for={id}>{label}</label>
</div>

<script lang="ts">
// Props
export var label: string;
export var padding = false;
export var pointer = false;

// Data
const id = String(Math.random());
</script>

<style lang="scss">

.inputWrapper {
    width: 100%;

    position: relative;
    box-sizing: border-box;

    border-radius: 0.5em;
    color: var(--text-on-background);
    font-weight: bold;
    outline: 0;
    border: 2px solid var(--accent-color);
    font-family: var(--font-family);

    &.padding {
        padding: 0.75em;
    }

    &.pointer {
        cursor: pointer;
    }

    label {
        position: absolute;
        padding: 0 0.3em;
        left: 0.9em;
        top: -0.5em;

        font-size: 0.75em;
        font-weight: 700;
        transition: all 150ms var(--standard-easing);
        background-color: var(--background);
        cursor: text;
        color: var(--accent-color);
    }
}

</style>
