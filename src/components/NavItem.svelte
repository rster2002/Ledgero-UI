<a href={route} use:link>
    <div class="wrapper {isCurrent && 'current'}">
        <div class="icon">
            <div class="innerIcon">
                <slot name="icon" class="iconSlot" />
            </div>
        </div>
        <div class="text">
            <slot />
        </div>
    </div>
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

a {
    text-decoration: none;
}

.wrapper {
    --width: var(--inner-width);

    color: var(--text-on-accent);
    display: flex;
    flex-direction: row;

    --icon-color: var(--text-on-accent);

    .icon {
        min-width: var(--width);
        height: var(--width);

        display: grid;
        place-items: center;

        .innerIcon {
            padding: 0.6em;
            display: grid;
            place-items: center;

            border: 2px solid transparent;
            border-radius: var(--border-radius-small);

            :global(svg) {
                font-size: 1.4em;
            }
        }
    }

    &.current .icon .innerIcon {
        border-color: var(--icon-color);
    }

    .text {
        padding: 0 0.5em;
        display: flex;
        flex-direction: column;
        justify-content: center;

        text-decoration-line: none;
        font-family: var(--header-face);
        font-weight: 700;
        white-space: nowrap;
    }

    &:hover {
        background-color: var(--text-on-accent);
        color: var(--accent-color);

        --icon-color: var(--accent-color);
    }
}

</style>
