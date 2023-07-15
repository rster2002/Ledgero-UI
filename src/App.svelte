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

    if (event.detail.route === "/*") {
        replace("/login");
    } else {
        replace("/");
    }
}
</script>

<style lang="scss">
@use "./scss/mdl";
@use "./scss/typescale";
@use "./scss/theme";
@import "shared";

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

main {
    height: 100%;
    width: 100%;

    font-family: var(--font-family);

    $colors: (
      "--md-ref-palette-primary0": #000000,
      "--md-ref-palette-primary10": #0d0664,
      "--md-ref-palette-primary20": #252477,
      "--md-ref-palette-primary25": #313083,
      "--md-ref-palette-primary30": #3c3c8f,
      "--md-ref-palette-primary35": #48499c,
      "--md-ref-palette-primary40": #5555a9,
      "--md-ref-palette-primary50": #6d6ec3,
      "--md-ref-palette-primary60": #8788df,
      "--md-ref-palette-primary70": #a2a3fc,
      "--md-ref-palette-primary80": #c1c1ff,
      "--md-ref-palette-primary90": #e2dfff,
      "--md-ref-palette-primary95": #f2efff,
      "--md-ref-palette-primary98": #fcf8ff,
      "--md-ref-palette-primary99": #fffbff,
      "--md-ref-palette-primary100": #ffffff,
      "--md-ref-palette-secondary0": #000000,
      "--md-ref-palette-secondary10": #1a1a2c,
      "--md-ref-palette-secondary20": #2f2f42,
      "--md-ref-palette-secondary25": #3a3a4d,
      "--md-ref-palette-secondary30": #454559,
      "--md-ref-palette-secondary35": #515065,
      "--md-ref-palette-secondary40": #5d5c72,
      "--md-ref-palette-secondary50": #76758b,
      "--md-ref-palette-secondary60": #908ea5,
      "--md-ref-palette-secondary70": #aba9c1,
      "--md-ref-palette-secondary80": #c6c4dd,
      "--md-ref-palette-secondary90": #e2e0f9,
      "--md-ref-palette-secondary95": #f2efff,
      "--md-ref-palette-secondary98": #fcf8ff,
      "--md-ref-palette-secondary99": #fffbff,
      "--md-ref-palette-secondary100": #ffffff,
      "--md-ref-palette-tertiary0": #000000,
      "--md-ref-palette-tertiary10": #2f1124,
      "--md-ref-palette-tertiary20": #46263a,
      "--md-ref-palette-tertiary25": #533145,
      "--md-ref-palette-tertiary30": #5f3c51,
      "--md-ref-palette-tertiary35": #6c475d,
      "--md-ref-palette-tertiary40": #795369,
      "--md-ref-palette-tertiary50": #946b82,
      "--md-ref-palette-tertiary60": #b0849c,
      "--md-ref-palette-tertiary70": #cc9eb7,
      "--md-ref-palette-tertiary80": #e9b9d3,
      "--md-ref-palette-tertiary90": #ffd8eb,
      "--md-ref-palette-tertiary95": #ffecf3,
      "--md-ref-palette-tertiary98": #fff8f8,
      "--md-ref-palette-tertiary99": #fffbff,
      "--md-ref-palette-tertiary100": #ffffff,
      "--md-ref-palette-neutral0": #000000,
      "--md-ref-palette-neutral10": #1c1b1f,
      "--md-ref-palette-neutral20": #313034,
      "--md-ref-palette-neutral25": #3c3b3f,
      "--md-ref-palette-neutral30": #47464a,
      "--md-ref-palette-neutral35": #535256,
      "--md-ref-palette-neutral40": #5f5e62,
      "--md-ref-palette-neutral50": #78767a,
      "--md-ref-palette-neutral60": #929094,
      "--md-ref-palette-neutral70": #adaaaf,
      "--md-ref-palette-neutral80": #c8c5ca,
      "--md-ref-palette-neutral90": #e5e1e6,
      "--md-ref-palette-neutral95": #f3eff4,
      "--md-ref-palette-neutral98": #fcf8fd,
      "--md-ref-palette-neutral99": #fffbff,
      "--md-ref-palette-neutral100": #ffffff,
      "--md-ref-palette-neutral-variant0": #000000,
      "--md-ref-palette-neutral-variant10": #1b1b23,
      "--md-ref-palette-neutral-variant20": #303038,
      "--md-ref-palette-neutral-variant25": #3b3a43,
      "--md-ref-palette-neutral-variant30": #47464f,
      "--md-ref-palette-neutral-variant35": #52515b,
      "--md-ref-palette-neutral-variant40": #5e5d67,
      "--md-ref-palette-neutral-variant50": #777680,
      "--md-ref-palette-neutral-variant60": #918f9a,
      "--md-ref-palette-neutral-variant70": #acaab4,
      "--md-ref-palette-neutral-variant80": #c8c5d0,
      "--md-ref-palette-neutral-variant90": #e4e1ec,
      "--md-ref-palette-neutral-variant95": #f2effa,
      "--md-ref-palette-neutral-variant98": #fcf8ff,
      "--md-ref-palette-neutral-variant99": #fffbff,
      "--md-ref-palette-neutral-variant100": #ffffff,
      "--md-ref-palette-error0": #000000,
      "--md-ref-palette-error10": #410002,
      "--md-ref-palette-error20": #690005,
      "--md-ref-palette-error25": #7e0007,
      "--md-ref-palette-error30": #93000a,
      "--md-ref-palette-error35": #a80710,
      "--md-ref-palette-error40": #ba1a1a,
      "--md-ref-palette-error50": #de3730,
      "--md-ref-palette-error60": #ff5449,
      "--md-ref-palette-error70": #ff897d,
      "--md-ref-palette-error80": #ffb4ab,
      "--md-ref-palette-error90": #ffdad6,
      "--md-ref-palette-error95": #ffedea,
      "--md-ref-palette-error98": #fff8f7,
      "--md-ref-palette-error99": #fffbff,
      "--md-ref-palette-error100": #ffffff,
    );

    @include mdl.root;
    @include typescale.standard-typescale;

    $palette: theme.create-color-palette($colors);

    @include theme.light-theme($palette);

    @include typescale.use-scale(body-medium);

    // Amount colors
    --positive-amount: #a9f59f;
    --negative-amount: #ffc4c4;
    --positive-amount-on-bg: #527d4d;
    --negative-amount-on-bg: #ff3c3c;

    &:global(.dark) {
        color-scheme: dark;

        @include theme.dark-theme($palette);
    }
}

</style>
