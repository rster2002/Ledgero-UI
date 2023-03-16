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
    "/transactions/:id": wrap({
        asyncComponent: () => import("./MainView/Transactions/ViewTransaction.svelte"),
    }),
    "/categories/:id/subcategory/:subcategoryId": wrap({
        asyncComponent: () => import("./MainView/Categories/ViewSubcategory.svelte"),
    }),
    "/categories": wrap({
        asyncComponent: () => import("./MainView/Categories.svelte"),
    }),
    "/categories/:id": wrap({
        asyncComponent: () => import("./MainView/Categories/ViewCategory.svelte"),
    }),
    "/bank-accounts": wrap({
        asyncComponent: () => import("./MainView/BankAccounts.svelte"),
    }),
}
