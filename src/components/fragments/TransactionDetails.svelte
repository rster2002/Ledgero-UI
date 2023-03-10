<VLayout>
  <IconSection center>
    <CategoryIcon slot="icon" />
    <CategorySpan category={transaction.category} icon={false} />
  </IconSection>

  <IconSection center>
    <BankAccountIcon slot="icon" />
    <BankAccountSpan bankAccount={transaction.bankAccount} icon={false} />
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

// Props
export var transaction: TransactionDTO;
</script>
