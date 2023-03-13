<VLayout>
  <IconSection center>
    <CategoryIcon slot="icon" />
    <CategorySpan icon={false} category={transaction.category} />
  </IconSection>

  <IconSection center>
    <BankAccountIcon slot="icon" />
    <BankAccountSpan icon={false} bankAccount={transaction.bankAccount} />
  </IconSection>

  <IconSection center>
    <ExternalAccountIcon slot="icon" />
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
import BankAccountSpan from "@/components/BankAccountSpan.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import CategoryIcon from "@/components/icons/CategoryIcon.svelte";
import CategorySpan from "@/components/CategorySpan.svelte";
import ExternalAccountIcon from "@/components/icons/ExternalAccountIcon.svelte";
import ExternalAccountSpan from "@/components/ExternalAccountSpan.svelte";

// Props
export var transaction: TransactionDTO;
</script>
