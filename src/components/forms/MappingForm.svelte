<div class="mappingForm">
  <table>
    <colgroup>
      <col class="mappingCol" />
      <col class="selectCol" />
      <col class="exampleCol" />
    </colgroup>

    <tr>
      <th>Mapping</th>
      <th>Selected column</th>
      <th>Example values</th>
    </tr>

    <tr>
      <td>
        IBAN
      </td>
      <td>
        <select>

        </select>
      </td>
      <td>
        Some example data
      </td>
    </tr>
  </table>
</div>

<script lang="ts">
// Imports
import type CSVMapping from "@/models/dto/import/CSVMapping";

// Components
import VLayout from "@/components/layouts/VLayout.svelte";
import Input from "@/components/Input.svelte";

// Props
export var mapping: CSVMapping;
</script>

<style lang="scss">

table {
    width: 100%;

    .mappingCol {
        text-align: center;
    }
}

</style>
