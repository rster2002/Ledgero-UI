<main>
    <Router {routes} on:conditionsFailed={conditionsFailed} />
</main>

<script lang="ts">
// Components
import Router, { replace } from "svelte-spa-router";

// Imports
import routes from "@/routes";

// Functions
function conditionsFailed(event) {
    console.error('conditionsFailed event', event.detail)
    //
    if (event.detail.route === "/*") {
        replace("/login");
    } else {
        replace("/");
    }
}
</script>

<style lang="scss">
@import "shared";
@import "./scss/colors";

@font-face {
    font-family: "Roboto";
    src: url("./fonts/Roboto-Regular.ttf");
    font-weight: 400;
}

@font-face {
    font-family: "Roboto";
    src: url("./fonts/Roboto-Medium.ttf");
    font-weight: 500;
}

@font-face {
    font-family: "Roboto";
    src: url("./fonts/Roboto-Bold.ttf");
    font-weight: 700;
}

@font-face {
    font-family: "Blanka";
    src: url("./fonts/Blanka.otf");
}

@font-face {
    font-family: "Ubuntu";
    src: url("./fonts/Ubuntu-Bold.ttf");
    font-weight: 700;
}

:global(html), :global(body) {
    height: 100%;
    width: 100%;

    padding: 0;
    margin: 0;
}

:global(body) {
    // Font
    --font-family: "Roboto", sans-serif;
    --header-face: "Ubuntu", sans-serif;
    --display-face: "Blanka", sans-serif;

    // Tint colors
    --tint-25: #f9f9ff;
    --tint-50: #E3ECFD;
    --tint-100: #C2D6FA;
    --tint-200: #8AAFF5;
    --tint-300: #4D86EF;
    --tint-400: #145EE6;
    --tint-500: #0F46AB;
    --tint-600: #0C3788;
    --tint-700: #092A67;
    --tint-800: #061D46;
    --tint-900: #030D21;

    // Elevation
    --md-sys-elevation-level0: 0 0;
    --md-sys-elevation-level1: 0 0;
    --md-sys-elevation-level2: 0 0;
    --md-sys-elevation-level3: var(--md-ref-palette-neutral87) 0 0 0.5em;
    --md-sys-elevation-level4: 0 0;
    --md-sys-elevation-level5: 0 0;

    // Backdrop is the global container
    --backdrop: var(--tint-50);
    --header-on-backdrop: #000000;
    --text-on-backdrop: #49454f;

    // Background is for elements like cards or sections
    --background: var(--tint-25);
    --header-on-background: #1c1b1f;
    --text-on-background: #49454f;
    --low-on-background: #646464;

    // Theme colors
    --primary-color: var(--tint-900);
    --text-on-pimary: #ffffff;
    --accent-color: var(--tint-500);
    --display-on-accent: #ffffff;
    --text-on-accent: #ffffff;
    --disabled-color: #7e7e7e;
    --error-color: #b40e0e;
    --text-on-error: #ffffff;

    $colors: (
            "md-ref-palette-primary10": #21005E,
            "md-ref-palette-primary20": #371E73,
            "md-ref-palette-primary30": #4F378B,
            "md-ref-palette-primary40": #6750A4,
            "md-ref-palette-primary80": #D0BCFF,
            "md-ref-palette-primary90": #EADDFF,
            "md-ref-palette-primary100": #FFFFFF,

            "md-ref-palette-secondary10": #1E192B,
            "md-ref-palette-secondary20": #332D41,
            "md-ref-palette-secondary30": #4A4458,
            "md-ref-palette-secondary40": #625B71,
            "md-ref-palette-secondary80": #CCC2DC,
            "md-ref-palette-secondary90": #E8DEF8,
            "md-ref-palette-secondary100": #FFFFFF,

            "md-ref-palette-tertiary10": #370B1E,
            "md-ref-palette-tertiary20": #492532,
            "md-ref-palette-tertiary30": #633B48,
            "md-ref-palette-tertiary40": #7D5260,
            "md-ref-palette-tertiary80": #EFB8C8,
            "md-ref-palette-tertiary90": #FFD8E4,
            "md-ref-palette-tertiary100": #FFFFFF,

            "md-ref-palette-neutral0": #000000,
            "md-ref-palette-neutral4": #0F0D13,
            "md-ref-palette-neutral6": #141218,
            "md-ref-palette-neutral10": #1D1B20,
            "md-ref-palette-neutral12": #211F26,
            "md-ref-palette-neutral17": #2B2930,
            "md-ref-palette-neutral20": #313033,
            "md-ref-palette-neutral22": #36343B,
            "md-ref-palette-neutral24": #3B383E,
            "md-ref-palette-neutral87": #DED8E1,
            "md-ref-palette-neutral90": #E6E0E9,
            "md-ref-palette-neutral92": #ECE6F0,
            "md-ref-palette-neutral94": #F3EDF7,
            "md-ref-palette-neutral95": #F4EFF4,
            "md-ref-palette-neutral96": #F7F2FA,
            "md-ref-palette-neutral98": #FEF7FF,
            "md-ref-palette-neutral100": #FFFFFF,
            "md-ref-palette-neutral-variant30": #49454E,
            "md-ref-palette-neutral-variant50": #79747E,
            "md-ref-palette-neutral-variant60": #938F99,
            "md-ref-palette-neutral-variant80": #C4C7C5,
            "md-ref-palette-neutral-variant90": #CAC4D0,

            "md-ref-palette-error10": #410E0B,
            "md-ref-palette-error20": #601410,
            "md-ref-palette-error30": #8C1D18,
            "md-ref-palette-error40": #B3261E,
            "md-ref-palette-error80": #F2B8B5,
            "md-ref-palette-error90": #F9DEDC,
            "md-ref-palette-error100": #FFFFFF
    );

    @include create-rgb-color-palette($colors);
    @include full-color-palette;
    @include light-color-tokens;
    @include full-tokens;

    // State labels
    --md-sys-state-hover-state-layer-opacity: 0.08;

    // Typography
    --font-display-large-font-family: var(--font-family);
    --font-display-large-line-height: 4em;
    --font-display-large-font-size: 3.5625em;
    --font-display-large-tracking: -0.015625em;
    --font-display-large-weight: 400;

    --font-display-medium-font-family: var(--font-family);
    --font-display-medium-line-height: 3.25em;
    --font-display-medium-font-size: 2.8125em;
    --font-display-medium-tracking: 0;
    --font-display-medium-weight: 400;

    --font-display-small-font-family: var(--font-family);
    --font-display-small-line-height: 2.75em;
    --font-display-small-font-size: 2.25em;
    --font-display-small-tracking: 0;
    --font-display-small-weight: 400;

    --font-headline-large-font-family: var(--font-family);
    --font-headline-large-line-height: 2.5em;
    --font-headline-large-font-size: 2em;
    --font-headline-large-tracking: 0;
    --font-headline-large-weight: 400;

    --font-headline-medium-font-family: var(--font-family);
    --font-headline-medium-line-height: 2.25em;
    --font-headline-medium-font-size: 1.75em;
    --font-headline-medium-tracking: 0;
    --font-headline-medium-weight: 400;

    --font-headline-small-font-family: var(--font-family);
    --font-headline-small-line-height: 2em;
    --font-headline-small-font-size: 1.5em;
    --font-headline-small-tracking: 0;
    --font-headline-small-weight: 400;

    --font-title-large-font-family: var(--font-family);
    --font-title-large-line-height: 1.75em;
    --font-title-large-font-size: 1.375em;
    --font-title-large-tracking: 0;
    --font-title-large-weight: 400;

    --font-title-medium-font-family: var(--font-family);
    --font-title-medium-line-height: 1.5em;
    --font-title-medium-font-size: 1em;
    --font-title-medium-tracking: 0.009375em;
    --font-title-medium-weight: 500;

    --font-title-small-font-family: var(--font-family);
    --font-title-small-line-height: 1.25em;
    --font-title-small-font-size: 0.875em;
    --font-title-small-tracking: 0.00625em;
    --font-title-small-weight: 500;

    --font-label-large-font-family: var(--font-family);
    --font-label-large-line-height: 1.25em;
    --font-label-large-font-size: 0.875em;
    --font-label-large-tracking: 0.00625em;
    --font-label-large-weight: 500;

    --font-label-medium-font-family: var(--font-family);
    --font-label-medium-line-height: 1em;
    --font-label-medium-font-size: 0.75em;
    --font-label-medium-tracking: 0.03125em;
    --font-label-medium-weight: 500;

    --font-label-small-font-family: var(--font-family);
    --font-label-small-line-height: 1em;
    --font-label-small-font-size: 0.6875em;
    --font-label-small-tracking: 0.03125em;
    --font-label-small-weight: 500;

    --font-body-large-font-family: var(--font-family);
    --font-body-large-line-height: 1.5em;
    --font-body-large-font-size: 1em;
    --font-body-large-tracking: 0.03125em;
    --font-body-large-weight: 400;

    --font-body-medium-font-family: var(--font-family);
    --font-body-medium-line-height: 1.25em;
    --font-body-medium-font-size: 0.875em;
    --font-body-medium-tracking: 0.015625em;
    --font-body-medium-weight: 400;

    --font-body-small-font-family: var(--font-family);
    --font-body-small-line-height: 1em;
    --font-body-small-font-size: 0.75em;
    --font-body-small-tracking: 0.025em;
    --font-body-small-weight: 400;

    // Shadows
    --box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
    --drop-shadow: drop-shadow(0px 0px 2px rgba(163, 163, 163, 0.6));

    // Border radius
    --border-radius-none: 0em;
    --border-radius-extra-small: 0.25em;
    --border-radius-extra-small-top: 0.25em 0.25em 0 0;
    --border-radius-small: 0.5em;
    --border-radius-medium: 0.75em;
    --border-radius-large: 1em;
    --border-radius-large-end: 0 1em 1em 0;
    --border-radius-large-top: 1em 1em 0 0;
    --border-radius-extra-large: 1.75em;
    --border-radius-extra-large-top: 1.75em 1.75em 0 0;
    --border-radius-full: 100000em;

    // Fall backs
    --border-radius-tiny: var(--border-radius-extra-small);
    --border-radius-round: var(--border-radius-full);

    // Material design
    --standard-easing: cubic-bezier(0.4, 0.0, 0.2, 1);
    --decelerated-easing: cubic-bezier(0.0, 0.0, 0.2, 1);
    --accelerated-easing: cubic-bezier(0.4, 0.0, 1, 1);

    // Snackbar
    --snackbar-success-background: #cef8db;
    --snackbar-success-primary: #3e8256;
    --snackbar-error-background: #edcbcb;
    --snackbar-error-primary: #b52d2d;

    // Amount colors
    --positive-amount: #a9f59f;
    --negative-amount: #ffc4c4;
    --positive-amount-on-bg: #527d4d;
    --negative-amount-on-bg: #ff3c3c;

    --compact-break: 37.5em;
    --medium-break: 52.5em;
}

main {
    height: 100%;
    width: 100%;

    font-family: var(--font-family);

    &.dark {
        color-scheme: dark;

        @include dark-color-tokens;
    }
}

</style>
