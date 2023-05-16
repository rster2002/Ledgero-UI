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

    :global(svg) {
        font-size: 1.5em;
    }

    &:hover {
        background-color: #d7e4fc;
    }

    &:active {
        background-color: #d2e1fc;
        color: var(--text-on-backdrop);
    }

    &.current {
        background-color: var(--tint-100);
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

            font-family: var(--font-label-medium-font-family);
            font-size: var(--font-label-medium-font-size);
            font-weight: var(--font-label-medium-weight);
            line-height: var(--font-label-medium-line-height);
            letter-spacing: var(--font-label-medium-tracking);
        }

        &.current {
            background-color: transparent;

            .iconSpan {
                background-color: var(--tint-100);
            }

            .textSpan {
                font-weight: 600;
            }
        }
    }
}

</style>
