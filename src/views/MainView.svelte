<section>
  <NavBar>
    <Fab on:click={() => push("/transactions/upload")}>
      <UploadIcon />
      <span>Upload CSV</span>
    </Fab>

    <NavItem route="/">
      <HomeIcon slot="icon" />
      Home
    </NavItem>

    <NavItem route="/transactions">
      <TransactionsIcon slot="icon" />
      Transactions
    </NavItem>

    <NavItem route="/categories">
      <CategoriesIcon slot="icon" />
      Categories
    </NavItem>

    <NavItem route="/external-accounts">
      <ContactsIcon slot="icon" />
      Contacts
    </NavItem>

    <NavItem route="/bank-accounts">
      <BankAccountIcon slot="icon" />
      Accounts
    </NavItem>
  </NavBar>

  <div class="routeWrapper">
    <div class="routeContainer">
      <Router routes={nestedRoutes} />
    </div>
  </div>
</section>

<script lang="ts">
// Imports
import Router, { push } from "svelte-spa-router";
import nestedRoutes from "@/views/nestedRoutes";

// Components
import NavBar from "@/components/NavBar.svelte";
import NavItem from "@/components/NavItem.svelte";
import HomeIcon from "@/components/icons/HomeIcon.svelte";
import TransactionsIcon from "@/components/icons/TransactionsIcon.svelte";
import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import UploadIcon from "@/components/icons/UploadIcon.svelte";
import Fab from "@/components/Fab.svelte";
import ContactsIcon from "@/components/icons/ContactsIcon.svelte";
</script>

<style lang="scss">
@import "../shared";

section {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;

    background-color: var(--backdrop);
    //background-color: var(--backdrop);
    //background: rgb(227,236,253);
    //background: linear-gradient(0deg, rgba(227,236,253,1) 0%, rgba(255,255,255,1) 100%);
}

.routeWrapper {
    width: 100%;
    padding: 2em 2em 2em 0;
    box-sizing: border-box;

    .routeContainer {
        height: 100%;
        //background-color: var(--background);
        //border-radius: var(--border-radius-medium);
    }
}

@media only screen and (max-width: $compact-breakpoint){
    section {
        flex-direction: column-reverse;
    }

    .routeWrapper {
        padding: 0;
    }
}

</style>
