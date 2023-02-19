import { wrap } from "svelte-spa-router/wrap";
import AuthenticationService from "@/services/AuthenticationService";

const authenticationService = new AuthenticationService();

export default {
    "/login": wrap({
        asyncComponent: () => import("./views/LoginView.svelte"),
        conditions: [
            async () => !(await authenticationService.isLoggedIn()),
        ],
    }),
    "/*": wrap({
        asyncComponent: () => import("./views/MainView.svelte"),
        conditions: [
            async () => await authenticationService.isLoggedIn(),
        ],
    }),
};
