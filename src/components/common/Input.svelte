<div class="inputWrapper">
    <input placeholder=" " {id} {...$$props} bind:value />
    <label for={id}>{label}</label>
</div>

<script lang="ts">
// Props
export var label: string;
export var value;

// Data
const id = String(Math.random());
</script>

<style lang="scss">

.inputWrapper {
    position: relative;

    label {
        position: absolute;
        padding: 0 0.3em;
        left: 0.2em;
        top: 0.65em;

        transition: all 150ms var(--standard-easing);
        background-color: var(--background);
        cursor: text;
        color: var(--accent-color);
    }

    input {
        width: 100%;

        padding: 0.75em;
        box-sizing: border-box;

        border-radius: 0.5em;
        color: var(--text-on-background);
        font-weight: bold;
        outline: 0;
        border: 2px solid var(--accent-color);
        font-family: var(--font-family);

        &:focus ~ label,
        &:not(:placeholder-shown) ~ label {
            left: 0.9em;
            top: -0.5em;

            font-size: 0.75em;
            font-weight: 700;
        }
    }
}

</style>
