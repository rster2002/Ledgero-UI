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
    </VLayout>
  </Card>
</Page>

<script lang="ts">
// Components
import Page from "@/components/Page.svelte";
import Card from "@/components/Card.svelte";
import VLayout from "@/components/layouts/VLayout.svelte";
import FileUpload from "@/components/FileUpload.svelte";

// Data
let csvFile: File | null = null;

$: parseCsv(csvFile);

// Functions
async function parseCsv(file: File | null) {
    if (file === null) {
        return;
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

</style>
