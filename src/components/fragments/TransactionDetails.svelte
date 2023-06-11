<VLayout>
  <IconSection center>
    <CategoryIcon slot="icon" />
    <CategorySpan icon={false} category={transaction.category} />
  </IconSection>

  <IconSection center>
    <SubcategoryIcon slot="icon" />
    <SubcategorySpan icon={false} subcategory={transaction.subcategory} />
  </IconSection>

  <IconSection center>
    <BankAccountIcon slot="icon" />
    <BankAccountSpan icon={false} bankAccount={transaction.bankAccount} />
  </IconSection>

  <IconSection center>
    <svelte:fragment slot="icon">
      {#if transaction.externalAccount}
        <ContactIcon />
      {:else}
        <NoContactIcon />
      {/if}
    </svelte:fragment>

    <ExternalAccountSpan
      icon={false}
      externalAccount={transaction.externalAccount}
      externalAccountName={transaction.externalAccountName}
    />
  </IconSection>

  <IconSection>
    <TextIcon slot="icon" />
    {transaction.description}
  </IconSection>
</VLayout>

<script lang="ts">
// Imports
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

// Components
import IconSection from "@/components/common/IconSection.svelte";
import TextIcon from "@/components/icons/TextIcon.svelte";
import BankAccountIcon from "@/components/icons/BankAccountIcon.svelte";
import BankAccountSpan from "@/components/spans/BankAccountSpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import CategorySpan from "@/components/spans/CategorySpan.svelte";
import ExternalAccountSpan from "@/components/spans/ContactSpan.svelte";
import SubcategoryIcon from "@/components/icons/SubcategoryIcon.svelte";
import SubcategorySpan from "@/components/spans/SubcategorySpan.svelte";
import ContactIcon from "@/components/icons/ContactIcon.svelte";
import NoContactIcon from "@/components/icons/NoContactIcon.svelte";

// Props
export var transaction: TransactionDTO;
</script>
