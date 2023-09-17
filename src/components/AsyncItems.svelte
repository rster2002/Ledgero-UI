<slot {items} done={done ?? true} {next} />

<script lang="ts">
// Imports
import useContextListeners from "@/composables/useContextListeners";

// Types
type T = $$Generic;

interface $$Slots {
  default: {
    items: T[];
  };
}

// Props
export var generator: AsyncGenerator<T>;
export const next = () => {
  return nextPage();
}

// Data
let items: T[] = [];
let done = undefined;

// Functions
async function nextPage() {
  if (done) {
    return;
  }

  const result = await generator.next();

  done = !!result.done;
  items = [
    ...items,
    ...result.value,
  ];
}

next();
</script>
