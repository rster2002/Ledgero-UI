import { wrap } from "svelte-spa-router/wrap";

export default {
    "/": wrap({
        asyncComponent: () => import("./MainView/Home.svelte"),
    }),
    "/transactions": wrap({
        asyncComponent: () => import("./MainView/Transactions.svelte"),
    }),
    "/transactions/upload": wrap({
        asyncComponent: () => import("./MainView/Transactions/UploadTransactions.svelte"),
    }),
    "/categories": wrap({
        asyncComponent: () => import("./MainView/Categories.svelte"),
    }),
}