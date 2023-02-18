import { wrap } from "svelte-spa-router/wrap";

// import LoadingView from "@/views/LoadingView.svelte";

const routes = {
    "/login": wrap({
        asyncComponent: () => import("./views/LoginView.svelte"),
    }),
    "/": wrap({
        asyncComponent: () => import("./views/MainView.svelte"),
    })
    // "/campaign/:campaignId": wrap({ asyncComponent: () => import("./views/Campaign.svelte"), loadingComponent: LoadingView }),
    // "/character/:characterId": wrap({ asyncComponent: () => import("./views/CharacterSheet.svelte"), loadingComponent: LoadingView }),
    // "/test": wrap({ asyncComponent: () => import("./views/Testing.svelte"), loadingComponent: LoadingView }),
    // "/": wrap({ asyncComponent: () => import("./views/Index.svelte"), loadingComponent: LoadingView }),
    // "/*": wrap({ asyncComponent: () => import("./views/Index.svelte"), loadingComponent: LoadingView }),
}

export default routes;
