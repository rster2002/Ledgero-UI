<svelte:window
  on:locationchange={locationChange}
  on:hashchange={locationChange}
/>

<a {href} class="{current && 'current'} {noIcon && 'noIcon'}">
  <slot />
</a>

<script lang="ts">
// Props
export var href: string;
export var noChildren: boolean = false;
export var noIcon: boolean = false;

// Data
let current: boolean = false;

// Functions
function locationChange() {
    if (noChildren) {
        current = location.href.replace(location.origin, "") === href;
        return;
    }

    current = (location.href.replace(location.origin, "")).startsWith(href);
}

// Created
locationChange();
</script>

<style lang="scss">
@use "../scss/dp";
@use "../scss/color";
@use "../scss/typescale";
@use "../scss/state-layer";
@use "../scss/breakpoints";

a {
    height: dp.dp(56);
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: dp.dp(12);
    padding: 0 dp.dp(24) 0 dp.dp(16);
    box-sizing: border-box;

    text-decoration: none;
    background-color: color.use(--nav-background);
    color: color.use(--md-sys-color-on-surface-variant);
    border-radius: var(--md-sys-shape-corner-full);
    cursor: pointer;

    :global(svg) {
        font-size: dp.dp(24);
    }

    &.noIcon {
        padding-right: dp.dp(24);
    }

    &:hover {
        background-color: state-layer.hover-state-layer(--nav-background, --md-sys-color-on-surface);
    }

    @include typescale.use-scale(label-large);

    &.current {
        background-color: color.use(--md-sys-color-secondary-container);
        color: color.use(--md-sys-color-on-secondary-container);

        &:hover {
            background-color: state-layer.hover-state-layer(--md-sys-color-secondary-container, --md-sys-color-on-secondary-container)
        }
    }
}

@media only screen and (max-width: breakpoints.$medium-breakpoint) {
    a {
        padding: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: dp.dp(4);

        background-color: transparent;

        @include typescale.use-scale(label-medium);

        & :global(.icon) {
            height: dp.dp(32);
            width: dp.dp(56);

            display: grid;
            place-items: center;

            border-radius: var(--md-sys-shape-corner-full);
        }

        &:hover {
            background-color: transparent;

            & :global(.icon) {
                background-color: color.use(--md-sys-color-on-surface-variant, 0.08);
            }
        }

        &.current {
            background-color: transparent;

            & :global(.icon) {
                background-color: color.use(--md-sys-color-secondary-container);
            }

            &:hover {
                background-color: transparent;

                & :global(.icon) {
                    background-color: state-layer.hover-state-layer(--md-sys-color-secondary-container, --md-sys-color-on-surface);
                }
            }
        }
    }
}

@media only screen and (max-width: breakpoints.$compact-breakpoint) {
    a {
        width: unset;
    }
}
</style>
