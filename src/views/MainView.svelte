<section>
  <NavBar>
    <Fab on:click={() => push("/transactions/upload")}>
      <UploadIcon />
      <span>Upload CSV</span>
    </Fab>

    <NavItem href="/#/" noChildren>
      <HomeIcon />
      Home
    </NavItem>

    <NavItem href="/#/transactions">
      <TransactionsIcon />
      Transactions
    </NavItem>

    <NavItem href="/#/categories">
      <CategoriesIcon />
      Categories
    </NavItem>

    <NavItem href="/#/external-accounts">
      <ContactsIcon />
      Contacts
    </NavItem>

    <NavItem href="/#/bank-accounts">
      <BankAccountIcon />
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
@use "../scss/color";
@import "../shared";

section {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;

    background-color: color.use(--md-sys-color-surface);
    //background-color: var(--backdrop);
    //background: rgb(227,236,253);
    //background: linear-gradient(0deg, rgba(227,236,253,1) 0%, rgba(255,255,255,1) 100%);
}

.routeWrapper {
    //height: 100%;
    width: 100%;
    flex: 1;

    overflow-y: auto;

    padding: 2em 2em 2em 0;
    box-sizing: border-box;

    .routeContainer {
        height: 100%;
        container-type: inline-size;
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
