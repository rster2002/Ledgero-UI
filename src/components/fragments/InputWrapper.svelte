<div
  class="
    inputWrapper
    {padding && 'padding'}
    {pointer && 'pointer'}
    {focus && 'focus'}
    {active && 'active'}
  "
  on:click
>
  <slot {id} />
  <label for={id}>{label}</label>
</div>

<script lang="ts">
// Props
export var focus = false;
export var active = true;
export var label: string;
export var padding = false;
export var pointer = false;

// Data
const id = String(Math.random());
</script>

<style lang="scss">
@import "../../shared";

.inputWrapper {
    width: 100%;

    position: relative;
    box-sizing: border-box;

    border-radius: var(--border-radius-extra-small);
    color: var(--text-on-background);
    font-weight: bold;
    border: dp(1) solid var(--md-sys-color-outline);
    font-family: var(--font-family);
    background-color: inherit;

    &.padding {
        padding: 0.75em;
    }

    &.pointer {
        cursor: pointer;
    }

    label {
        position: absolute;
        padding: 0 0.3rem;
        left: 0.2rem;
        top: 0.65rem;

        transition: all 150ms var(--standard-easing);
        background-color: inherit;
        cursor: text;

        @include mdl-font(body-large);
        //color: var(--accent-color);
        //position: absolute;
        //padding: 0 0.3em;
        //left: 0.9em;
        //top: -0.5em;
        //
        //font-size: 0.75em;
        //font-weight: 700;
        //transition: all 150ms var(--standard-easing);
        //background-color: var(--background);
        //cursor: text;
        //color: var(--accent-color);
    }

    &.active {
        label {
            left: 0.5rem;
            top: -0.3rem;

            line-height: var(--font-body-small-line-height);
            font-size: var(--font-body-small-font-size);
        }
    }

    &.focus {
        border-color: var(--md-sys-color-primary);
        border-width: dp(2);

        label {
            color: var(--md-sys-color-primary);
        }
    }
}

</style>
