<section>
  <NavBar>
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

    <NavItem route="/bank-accounts">
      <BankAccountIcon slot="icon" />
      Bank accounts
    </NavItem>

    <NavItem route="/external-accounts">
      <ExternalAccountIcon slot="icon" />
      External accounts
    </NavItem>
  </NavBar>

  <div class="content">
    <Router routes={nestedRoutes} />
  </div>
</section>

<script lang="ts">
// Imports
import Router from "svelte-spa-router";
import nestedRoutes from "@/views/nestedRoutes";

// Components
import NavBar from "@/components/NavBar.svelte";
import NavItem from "@/components/NavItem.svelte";
import HomeIcon from "@/components/icons/HomeIcon.svelte";
import TransactionsIcon from "@/components/icons/TransactionsIcon.svelte";
import CategoriesIcon from "@/components/icons/CategoriesIcon.svelte";
import ExternalAccountIcon from "@/components/icons/ExternalAccountIcon.svelte";
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
</script>

<style lang="scss">

section {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;

    background-color: var(--backdrop);
}

.content {
    width: 100%;
}

</style>
