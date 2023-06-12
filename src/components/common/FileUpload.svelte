<div class="fileUpload" on:click={chooseFile}>
  <input bind:this={inputEl} on:change={change} type="file" accept=".csv" />
  <div class="dropzone {isDraggingOver && 'draggingOver'}" on:dragenter={dragenter} on:dragover={dragover}
       on:drop={drop} on:dragleave={dragend}
  >
    <h1>
      {fileName}
    </h1>
  </div>
</div>

<script lang="ts">
// Props
export var file: File | null = null;

// Data
let inputEl;
let isDraggingOver = false;
let fileName: string;

// Computed
$: fileName = file?.name ?? "Drop file or click";

// Functions
function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
    isDraggingOver = true;
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragend(e) {
    e.stopPropagation();
    e.preventDefault();
    isDraggingOver = false;
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    isDraggingOver = false;
    const dt = e.dataTransfer;
    inputEl.files = dt.files;
}

function change(e: InputEvent) {
    //@ts-ignore
    file = e.target.files[0] ?? null;
}

function chooseFile() {
    inputEl.click();
}
</script>

<style lang="scss">

.fileUpload {
    max-width: 400px;
}

input {
    display: none;
}

.dropzone {
    width: 100%;
    height: 150px;
    margin-bottom: 16px;
    border: 2px solid var(--md-sys-color-primary);
    box-sizing: border-box;
    border-radius: var(--border-radius-small);
    color: var(--md-sys-color-primary);
    cursor: pointer;

    &.draggingOver {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
    }

    h1 {
        width: 100%;
        padding: 0 16px;
        margin: 0;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        pointer-events: none;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

</style>
