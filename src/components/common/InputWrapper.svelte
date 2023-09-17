<div class="inputContainer {error && 'error'}">
  <div
    class="
    inputWrapper
    {padding && 'padding'}
    {pointer && 'pointer'}
    {focus && 'focus'}
    {active && 'active'}
    {full && 'full'}
  "
    on:click
  >
    <slot {id} />
    <label for={id}>{label}</label>
  </div>

  <span class="supporting {(supporting || error) && 'show'}">
    {error ?? supporting}
  </span>
</div>

<script lang="ts">
// Props
export var label: string;
export var supporting: string | undefined;
export var error: string | undefined;
export var full: boolean = false;
export var focus: boolean = false;
export var active: boolean = true;
export var padding: boolean = false;
export var pointer: boolean = false;

// Data
const id = String(Math.random());
</script>

<style lang="scss">
@use "../../scss/dp";
@use "../../scss/color";
@use "../../scss/typescale";

.inputWrapper {
    margin: dp.dp(1);
    position: relative;
    box-sizing: border-box;

    border-radius: var(--md-sys-shape-corner-extra-small);
    color: color.use(--md-sys-color-on-surface);
    font-weight: bold;
    border: dp.dp(1) solid color.use(--md-sys-color-outline);
    background-color: inherit;

    @include typescale.use-scale(body-large);

    &.full {
        width: 100%;
    }

    &.padding {
        padding: 0.75em;
    }

    &.pointer {
        cursor: pointer;
    }

    label {
        position: absolute;
        padding: 0 dp.dp(4);
        left: dp.dp(16);
        top: dp.dp(12);

        transition: all var(--md-sys-motion-duration-short3) var(--md-sys-motion-easing-standard);
        background-color: inherit;
        cursor: text;
        color: color.use(--md-sys-color-on-surface-variant);

        @include typescale.use-scale(body-large);
    }

    &.active {
        label {
            left: dp.dp(12);
            top: dp.dp(-8);

            @include typescale.use-scale(body-small);
        }
    }

    &.focus {
        margin: 0;

        border-color: color.use(--md-sys-color-primary);
        border-width: dp.dp(2);

        label {
            color: color.use(--md-sys-color-primary);
        }
    }
}

.supporting {
    visibility: hidden;

    padding: dp.dp(4) dp.dp(16) 0;
    box-sizing: border-box;

    color: color.use(--md-sys-color-on-surface-variant);
    @include typescale.use-scale(body-small);

    &.show {
        visibility: visible;
    }
}

.inputContainer {
    background-color: inherit;

    &.error {
        .inputWrapper {
            border-color: color.use(--md-sys-color-error);

            label {
                color: color.use(--md-sys-color-error);
            }
        }

        .supporting {
            color: color.use(--md-sys-color-error);
        }
    }
}

</style>
