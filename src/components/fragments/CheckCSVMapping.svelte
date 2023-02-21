<div class="checkCSVMapping">
  <p>
    <b>Amount</b>: <AmountSpan amount={result.amount} />
  </p>

  <p>
    <b>Description</b>: {result.description}
  </p>

  <p>
    <b>Date</b>: {formatDate(result.date)}
  </p>

  <p>
    <b>IBAN</b>: {result.accountIban}
  </p>

  <p>
    <b>Follow number</b>: {result.followNumber}
  </p>

  <p>
    <b>External account</b>: {result.externalAccountName}
  </p>
</div>

<script lang="ts">
// Imports
import formatDate from "@/utils/formatDate";
import type CheckCsvMappingDTO from "@/models/dto/import/CheckCsvMappingDTO";

// Components
import AmountSpan from "@/components/AmountSpan.svelte";

// Props
export var result: CheckCsvMappingDTO;
</script>
