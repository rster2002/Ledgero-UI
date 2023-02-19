<Page>
  <Card>
    <VLayout>
      <h1>Upload CSV</h1>

      <VLayout>
        <h2>Step 1: Upload your CSV file</h2>

        <p>
          Upload your CSV file from your bank below:
        </p>

        <FileUpload bind:file={csvFile} />
      </VLayout>

      <VLayout>
        <h2>Step 2: Select a template</h2>

        <p>
          Select one of the pre-made template to import, or create your own.
        </p>

        <div class="mappings">
          {#each mappingsJson.mappings as mapping}
            <button on:click={() => selectMapping(mapping.mapping)} class="{mapping.mapping === selectedMapping && 'selected'}">
              <img src={mapping.icon} alt={mapping.name} />
            </button>
          {/each}

<!--          <button on:click={() => selectMapping(customMapping)} class="{customMapping === selectedMapping && 'selected'}">-->
<!--            Custom template-->
<!--          </button>-->
        </div>

        {#if customMapping === selectedMapping}
          <MappingForm bind:mapping={customMapping} />
        {/if}
      </VLayout>

      <VLayout>
        <h2>Step 3: Import transactions</h2>

        <p>Click the button below to start importing the CSV file.</p>

        <div>
          <AsyncButton>
            Start importing
          </AsyncButton>
        </div>
      </VLayout>
    </VLayout>
  </Card>
</Page>

<script lang="ts">
// Imports
import type CSVMapping from "@/models/dto/import/CSVMapping";
import Papa from "papaparse";
import mappingsJson from "@/data/csv-mappings.json";
import AmountMapping from "@/models/dto/import/AmountMapping";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/Card.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import FileUpload from "@/components/FileUpload.svelte";
import MappingForm from "@/components/forms/MappingForm.svelte";
import AsyncButton from "@/components/AsyncButton.svelte";

// Data
let csvFile: File | null = null;
let selectedMapping: CSVMapping | null = null;
let customMapping: CSVMapping = {
    accountIban: 0,
    date: 1,
    dateMapping: {
        template: "$ 00:00+0100",
        format: "%F %R%z"
    },
    followNumber: 2,
    amount: 3,
    amountMapping: AmountMapping.EURO,
    description: 4,
    externalAccountName: 5
};

$: parseCsv(csvFile);

// Functions
async function parseCsv(file: File | null) {
    if (file === null) {
        return;
    }

    let result = Papa.parse(await file.text());
    console.log(result);
}

function selectMapping(mapping: CSVMapping) {
    selectedMapping = mapping;
}
</script>

<style lang="scss">

h1, h2, p {
    margin: 0;
}

h1 {
    font-size: 2em;
    margin: 0;
}

.mappings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;

    button {
        background-color: transparent;
        border: 2px solid #cecece;
        border-radius: var(--border-radius-small);
        cursor: pointer;
        font-family: var(--header-face);
        font-size: 1.1em;

        img {
            max-height: 100px;
        }

        &.selected {
            border-color: var(--accent-color);
        }
    }
}

</style>
