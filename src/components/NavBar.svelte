<aside>
<!--    <div class="user">-->
<!--        <img src="https://avatars.githubusercontent.com/u/26026518?v=4" alt="Profile picture of the currently logged in user" />-->
<!--    </div>-->

    <div class="place">
        <div class="inner">
            <slot />
        </div>
        <div class="scim"></div>
    </div>

    <button on:click={logout} class="logout">
        <LoginIcon />
    </button>
</aside>

<script>
// Components
import LoginIcon from "@/components/icons/LoginIcon.svelte";

// Imports
import AuthenticationService from "@/services/AuthenticationService";
import { push } from "svelte-spa-router";

// Data
const authenticationService = new AuthenticationService();

// Functions
async function logout() {
    await authenticationService.logout();
    await push("/login")
}
</script>


<style lang="scss">

aside {
    --width: 8em;
    --inner-width: 4em;

    width: var(--width);
    height: 100%;

    position: relative;
    display: grid;
    place-items: center;

    .user {
        top: 2em;
        position: absolute;

        img {
            --size: 3em;

            height: var(--size);
            width: var(--size);

            border-radius: var(--border-radius-round);
        }
    }

    .logout {
        --size: 3em;

        height: var(--size);
        width: var(--size);

        position: absolute;
        bottom: 2em;
        display: grid;
        place-items: center;
        font-size: 1.25em;
        color: #484848;
        background-color: transparent;
        border: 0;
        cursor: pointer;
        border-radius: var(--border-radius-round);
        transition: all 150ms var(--standard-easing);

        &:hover {
            background-color: var(--accent-color);
            color: var(--display-on-accent);
        }
    }

    .place {
        width: var(--inner-width);

        position: relative;
        display: grid;
        place-items: center;

        .inner {
            width: 16em;
            max-width: var(--inner-width);

            position: absolute;
            left: 0;
            padding: 4em 0;
            z-index: 4;
            overflow: hidden;

            background-color: var(--accent-color);
            border-radius: var(--border-radius-small);
            transition: max-width 250ms var(--standard-easing);

            &:hover {
                max-width: 16em;

                & + .scim {
                    backdrop-filter: blur(2px);
                    background-color: #f0f0f0ba;
                }
            }
        }
    }
}

.scim {
    width: 100%;
    height: 100%;

    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 1;
    backdrop-filter: blur(0px);
    transition: all 250ms var(--standard-easing);
}

</style>
