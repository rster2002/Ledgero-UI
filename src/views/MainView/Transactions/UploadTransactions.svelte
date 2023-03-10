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

      <DisabledSection disabled={csvFile === null}>
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

          {#if mappingCheckPromise !== null}
            <div>
              <h3>Example import</h3>

              <p>Check below if all the information is in the correct place.</p>

              <AsyncContent promise={mappingCheckPromise}>
                <CheckCSVMapping result={checkCsvMappingResult} />
              </AsyncContent>
            </div>
          {/if}

          {#if customMapping === selectedMapping}
            <MappingForm bind:mapping={customMapping} />
          {/if}
        </VLayout>
      </DisabledSection>

      <DisabledSection disabled={selectedMapping === null || csvFile === null}>
        <VLayout>
          <h2>Step 3: Import transactions</h2>

          <p>Click the button below to start importing the CSV file.</p>

          <div>
            <AsyncButton asyncClick={upload}>
              Start importing
            </AsyncButton>
          </div>
        </VLayout>
      </DisabledSection>
    </VLayout>
  </Card>
</Page>

<SuccessSnackbar message={successMessage} />
<ErrorSnackbar message={errorMessage} />

<script lang="ts">
// Imports
import type CSVMapping from "@/models/dto/import/CSVMapping";
import Papa from "papaparse";
import mappingsJson from "@/data/csv-mappings.json";
import AmountMapping from "@/models/dto/import/AmountMapping";
import type CheckCsvMappingDTO from "@/models/dto/import/CheckCsvMappingDTO";
import CSVImportService from "@/services/CSVImportService";

// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/common/Card.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import FileUpload from "@/components/common/FileUpload.svelte";
import MappingForm from "@/components/forms/MappingForm.svelte";
import AsyncButton from "@/components/common/AsyncButton.svelte";
import ErrorSnackbar from "@/components/Snackbars/ErrorSnackbar.svelte";
import SuccessSnackbar from "@/components/Snackbars/SuccessSnackbar.svelte";
import DisabledSection from "@/components/common/DisabledSection.svelte";
import AsyncContent from "@/components/common/AsyncContent.svelte";
import CheckCSVMapping from "@/components/fragments/CheckCSVMapping.svelte";
import { push } from "svelte-spa-router";

// Data
const csvImportService = new CSVImportService();
let csvFile: File | null = null;
let selectedMapping: CSVMapping | null = null;
let mappingCheckPromise: Promise<CheckCsvMappingDTO> | null = null;
let checkCsvMappingResult: CheckCsvMappingDTO | null = null;
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
let successMessage = [""];
let errorMessage = [""];

$: parseCsv(csvFile);
$: refreshMappingCheck(csvFile, selectedMapping);

// Functions
async function parseCsv(file: File | null) {
    if (file === null) {
        return;
    }

    let result = Papa.parse(await file.text());
}

function selectMapping(mapping: CSVMapping) {
    selectedMapping = mapping;
}

function refreshMappingCheck(file: File, mapping: CSVMapping) {
    if (file === null || mapping === null) {
        mappingCheckPromise = null;
        return;
    }

    let localPromise = csvImportService.checkCSVMapping(file, mapping);
    mappingCheckPromise = localPromise;

    mappingCheckPromise.then(data => {
        if (mappingCheckPromise !== localPromise) {
            return;
        }

        console.log(data);

        checkCsvMappingResult = data;
    });
}

async function upload() {
    if (csvFile === null) {
        errorMessage = ["No file selected"];
    }

    if (selectedMapping === null) {
        errorMessage = ["No mapping selected"];
    }

    try {
        await csvImportService.importCSVFile(csvFile, selectedMapping);
        successMessage = ["Transactions successfully imported!"];
        await push("/transactions");
    } catch (e) {
        errorMessage = ["Failed to import transactions"];
    }
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
