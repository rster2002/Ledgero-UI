<MessageSnackbar
  {message}
  {timeout}
  --snackbar-background="var(--snackbar-error-background)"
  --snackbar-primary="var(--snackbar-error-primary)"
/>

<script lang="ts">
// Components
import MessageSnackbar from "@/components/Snackbars/MessageSnackbar.svelte";

// Props
export var message: [string];
export var timeout = 3500;
</script>
