<Button
  on:click={click}
  {outline}
  {text}
  {icon}
  {disabled}
>
  {#if !loading}
    <slot/>
  {:else}
    <Spinner/>
  {/if}
</Button>

<script lang="ts">
// Components
import Button from "@/components/common/Button.svelte";
import Spinner from "@/components/fragments/Spinner.svelte";
import FormAction from "@/components/common/Form/FormAction";

// Props
export var asyncClick: <T>() => Promise<T>;
export var action = "submit" | "cancel" | undefined;
export var outline = false;
export var text = false;
export var icon = false;
export var disabled = false;

// Data
const formAction = new FormAction({
  disabled: state => disabled = state,
});
let loading = false;

// Functions
function click() {
  loading = true;

  if (action === "submit") {
    formAction.call(form => {
      form.submit()
        .finally(() => (loading = false));
    });
  }

  if (asyncClick) {
    asyncClick()
      .finally(() => (loading = false));
  }
}
</script>
