<nav>
  <slot />
</nav>

<style lang="scss">
@use "../scss/dp";
@use "../scss/color";
@use "../scss/typescale";
@use "../scss/breakpoints";

nav {
    @include color.alias(--nav-background, --md-sys-color-surface);

    height: 100%;
    width: dp.dp(360);

    container-type: inline-size;
    padding: dp.dp(24);
    box-sizing: border-box;
    background-color: color.use(--nav-background);

    & > :global(.fab) {
        width: 100%;
        margin-bottom: dp.dp(32);
    }
}

@media only screen and (max-width: breakpoints.$medium-breakpoint) {
    nav {
        width: dp.dp(80);

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: dp.dp(12);

        & > :global(.navAdditional) {
            display: none;
        }
    }
}

@media only screen and (max-width: breakpoints.$compact-breakpoint) {
    nav {
        height: unset;
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: dp.dp(12) 0 dp.dp(16);
        background-color: color.use(--md-sys-color-surface);

        & > :global(.navAdditional) {
            display: none;
        }
    }
}

</style>
