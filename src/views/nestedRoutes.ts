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
    "/organisation": wrap({
        asyncComponent: () => import("./MainView/OrganisationView.svelte"),
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
    // "/bank-accounts": wrap({
    //     asyncComponent: () => import("./MainView/BankAccounts.svelte"),
    // }),
    // "/bank-accounts/:id": wrap({
    //     asyncComponent: () => import("./MainView/BankAccounts/ViewBankAccount.svelte"),
    // }),
    // "/external-accounts": wrap({
    //     asyncComponent: () => import("./MainView/ExternalAccounts.svelte"),
    // }),
    // "/external-accounts/:id": wrap({
    //     asyncComponent: () => import("./MainView/ExternalAccounts/ViewExternalAccount.svelte"),
    // }),
}
