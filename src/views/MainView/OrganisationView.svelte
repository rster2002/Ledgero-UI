<div class="wrapper">
  <Card>
    <h1>Categories</h1>

    <p>
      Used to organize transactions.
    </p>

    <footer>
      <Button href="#/categories">
        View
      </Button>
    </footer>
  </Card>

  <Card>

  </Card>

  <Card>

  </Card>
</div>

<script lang="ts">
// Components
import Card from "@/components/common/Card.svelte";
import Button from "@/components/common/Button.svelte";
</script>

<style lang="scss">
@use "../../scss/dp";

.wrapper {
  max-width: 69rem;

  height: 100%;
  width: 100%;

  container-type: inline-size;
  container-name: transactions;

  margin: 0 auto;
  display: grid;
  grid-gap: dp.dp(24);
  grid-template-columns: repeat(auto-fit, minmax(dp.dp(275), 1fr));
  grid-auto-rows: 20rem;
  //grid-template-rows: 100%;

  .transactions {
    height: 100%;

    grid-column: span 4;
  }

  .details {
    grid-column: span 8;
  }

  :global(.card) {
    height: 100%;
    overflow-y: auto;
  }
}

</style>
