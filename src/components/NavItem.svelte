<a href={route} class="{isCurrent && 'current'}" use:link>
  <span class="iconSpan">
    <slot name="icon" class="iconSlot" />
  </span>
  <span class="textSpan">
    <slot />
  </span>
</a>

<script lang="ts">
// Imports
import { link, location } from 'svelte-spa-router'

// Props
export var route: string;

// Computed
$: isCurrent = checkIsCurrent($location, route);

// Functions
function checkIsCurrent(location: string, route: string): boolean {
    if (route === "/") {
        return location === "/";
    }

    return location.startsWith(route);
}
</script>

<style lang="scss">
@import "../shared";

a {
    height: 3.5em;

    display: flex;
    align-items: center;
    gap: 0.75em;
    padding: 0 1em;

    text-decoration: none;
    border-radius: var(--border-radius-full);
    font-weight: 500;
    color: var(--md-sys-color-on-surface-variant);

    :global(svg) {
        font-size: 1.5em;
    }

    &:hover {
        background-color: rgb(var(--md-sys-color-on-surface-rgb) / var(--md-sys-state-hover-state-layer-opacity));
        color: var(--md-sys-color-on-surface-variant);
    }

    &.current {
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
    }
}

@media only screen and (max-width: $medium-breakpoint){
    a .textSpan {
        display: none;
    }
}

@media only screen and (max-width: $compact-breakpoint){
    a {
        height: unset;
        background-color: transparent;

        padding: 0;
        display: flex;
        flex-direction: column;
        color: var(--md-sys-color-on-surface-variant);

        .iconSpan {
            height: dp(32);
            width: dp(64);

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: var(--border-radius-full);
        }

        .textSpan {
            display: initial;

            @include mdl-font(label-medium);
        }

        &.current {
            background-color: transparent;

            .iconSpan {
                background-color: var(--md-sys-color-secondary-container);
                color: var(--md-sys-color-on-secondary-container);
            }

            .textSpan {
                color: var(--md-sys-color-on-surface);
            }
        }
    }
}

</style>
