<button class="fab" on:click>
  <slot />
</button>

<style lang="scss">
@use "../scss/dp";
@use "../scss/typescale";
@use "../scss/color";
@use "../scss/breakpoints";
@use "../scss/state-layer";

.fab {
    height: dp.dp(56);
    min-width: dp.dp(80);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75em;
    padding: 1em;

    border-radius: var(--md-sys-shape-corner-large);
    border: 0;
    cursor: pointer;
    box-shadow: var(--md-sys-elevation-level3);
    background-color: color.use(--md-sys-color-primary-container);
    color: color.use(--md-sys-color-on-primary-container);
    transition: 150ms var(--md-sys-motion-easing-standard);
    transition-property: box-shadow, background-color;

    @include typescale.use-scale(label-large);

    &:hover {
        box-shadow: var(--md-sys-elevation-level4);
        background-color: state-layer.hover-state-layer(--md-sys-color-primary-container, --md-sys-color-on-primary-container);
    }

    :global(svg) {
        font-size: 1.5em;
    }
}

@media only screen and (max-width: breakpoints.$medium-breakpoint){
    .fab {
        min-width: unset;
        width: dp(56);

        :global(span) {
            display: none;
        }
    }
}

@media only screen and (max-width: breakpoints.$compact-breakpoint){
    button.fab {
        width: unset;

        position: fixed;
        bottom: dp(64);
        right: dp(16);

        :global(span) {
            display: initial;
        }
    }
}

</style>
