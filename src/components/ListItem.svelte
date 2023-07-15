<div class="listItem {clickable && 'clickable'}" on:click>
  <div class="start">
    {#if $$slots.leading}
      <div class="leading">
        <slot name="leading" />
      </div>
    {/if}

    <div class="text">
      <p class="headline">
        <slot />
      </p>

      {#if $$slots.supporting}
        <p class="supporting">
          <slot name="supporting" />
        </p>
      {/if}
    </div>
  </div>

  {#if $$slots.tailing}
    <div class="tailing">
      <slot name="tailing" />
    </div>
  {/if}
</div>

<script lang="ts">
// Props
export var clickable: boolean = false;
</script>

<style lang="scss">
@use "../scss/dp";
@use "../scss/typescale";
@use "../scss/state-layer";
@use "../scss/color";

.listItem {
    min-height: dp.dp(56);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: dp.dp(16);
    padding: dp.dp(8) dp.dp(24) dp.dp(8) dp.dp(16);

    background-color: color.use(--md-sys-color-surface);

    .start {
        display: flex;
        flex-direction: row;
        gap: dp.dp(16);

        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .headline {
                margin: 0;

                @include typescale.use-scale(body-large);
            }

            .supporting {
                margin: 0;

                @include typescale.use-scale(body-medium);
            }
        }
    }

    .leading, .tailing {
        display: grid;
        place-items: center;

        & > :global(img) {
            height: dp.dp(56);
            width: dp.dp(56);

            display: grid;
            place-items: center;
        }

        & > :global(.icon) {
            font-size: dp.dp(24);
            color: color.use(--md-sys-color-on-surface-variant);
        }
    }

    &.clickable {
        cursor: pointer;

        &:hover {
            background-color: state-layer.hover-state-layer(--md-sys-color-surface, --md-sys-color-on-surface);
        }
    }

    & + :global(.listItem) {
        border-top: dp.dp(1) solid color.use(--md-sys-color-surface-variant);
    }
}

</style>
