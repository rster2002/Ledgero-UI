<template>
  <Snackbar bind:open={open} {timeout}>
    {message[0]}
  </Snackbar>
</template>

<script lang="ts">
// Components
import Snackbar from "@/components/Snackbar.svelte";

// Props
export var message: [string];
export var timeout = 3500;

// Data
let open = false;

// Computed
$: updateOnMessage(message);

// Functions
function updateOnMessage(message: [string]) {
    let [newMessage] = message;

    if (newMessage !== "") {
        open = true;
    }
}
</script>
