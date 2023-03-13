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

:root {
    // Font
    --font-family: "Roboto", sans-serif;
    --header-face: "Ubuntu", sans-serif;
    --display-face: "Blanka", sans-serif;

    // Tint colors
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

    // Backdrop is the global container
    --backdrop: var(--tint-50);
    --header-on-backdrop: #000000;
    --text-on-backdrop: #49454f;

    // Background is for elements like cards or sections
    --background: #ffffff;
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

    // Shadows
    --box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
    --drop-shadow: drop-shadow(0px 0px 2px rgba(163, 163, 163, 0.6));

    // Border radius
    --border-radius-tiny: 0.3em;
    --border-radius-small: 0.5em;
    --border-radius-medium: 0.75em;
    --border-radius-round: 100000em;

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
}

:global(html), :global(body) {
    height: 100%;
    width: 100%;

    padding: 0;
    margin: 0;

    font-family: var(--font-family);
}

main {
    height: 100%;
    width: 100%;
}

</style>
