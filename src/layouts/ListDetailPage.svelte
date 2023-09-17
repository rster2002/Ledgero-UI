<div class="listDetail">
  <div class="list">
    <Card>
      <slot name="list" />
    </Card>
  </div>

  <div class="detail">
    <slot name="detail" />
  </div>
</div>

<script lang="ts">
// Imports
import Card from "@/components/common/Card.svelte";
</script>

<style lang="scss">
@use "../scss/dp";

.listDetail {
    height: 100%;
    width: 100%;

    container-type: inline-size;
    container-name: transactions;

    display: grid;
    //grid-gap: dp.dp(24);
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100%;

    .list  {
        height: 100%;

        grid-column: span 4;
        padding: dp.dp(32) dp.dp(0) dp.dp(32) dp.dp(32);
        box-sizing: border-box;
    }

    .detail  {
        padding: dp.dp(32) dp.dp(32) dp.dp(32) dp.dp(24);
        box-sizing: border-box;
        grid-column: span 8;

        overflow-y: auto;
    }

    :global(.card) {
        height: 100%;
        overflow-y: auto;
    }
}

@container (width < 80rem) {
    .listDetail {
        .list {
            grid-column: span 6;
        }

        .detail {
            grid-column: span 6;
        }
    }
}

</style>
