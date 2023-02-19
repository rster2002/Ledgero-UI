<section>
  <Card minimal>
    <HLayout>
      <aside>
        <h1>Ledgero</h1>
      </aside>

      <div class="login">
        <div class="inner">
          <VLayout>
            <h2>Login</h2>

            <Input label="Username" bind:value={username} />
            <Input label="Password" bind:value={password} type="password" />

            <AsyncButton asyncClick={() => login()}>
              <LoginIcon />
              Login
            </AsyncButton>

            <ErrorText {error} />
          </VLayout>
        </div>
      </div>
    </HLayout>
  </Card>
</section>

<script lang="ts">
// Imports
import { push } from "svelte-spa-router";
import AuthenticationService from "@/services/AuthenticationService";

// Components
import Card from "@/components/Card.svelte";
import Input from "@/components/Input.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import HLayout from "@/components/layouts/HLayout.svelte";
import AsyncButton from "@/components/AsyncButton.svelte";
import LoginIcon from "@/components/icons/LoginIcon.svelte";
import ErrorText from "@/components/error/ErrorText.svelte";

// Data
const authenticationService = new AuthenticationService();
let username = "";
let password = "";
let error: Error | null = null;

// Functions
async function login() {
    error = null;

    try {
        await authenticationService.login(username, password);
        push("/");
    } catch (e) {
        error = e;
    }
}
</script>

<style lang="scss">

section {
    height: 100%;
    width: 100%;

    display: grid;
    place-items: center;

    background-color: var(--backdrop);

    .box {

    }
}

aside {
    min-height: 400px;
    min-width: 300px;

    display: grid;
    place-items: center;

    border-radius: var(--border-radius-medium);
    background-color: var(--accent-color);
    color: var(--display-on-accent);
    font-family: var(--display-face);

    h1 {
        font-size: 2em;
    }
}

.login {
    min-width: 300px;

    display: grid;
    place-items: center;
    padding: 1em;

    .inner {
        width: 100%;
    }

    h2 {
        margin: 0;
        font-family: var(--header-face);
        font-weight: 700;
    }
}

</style>
