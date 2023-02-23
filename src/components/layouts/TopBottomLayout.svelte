<div class="topBottomLayout">
  <div class="top">
    <slot />
  </div>

  <div class="bottom">
    <slot name="bottom" />
  </div>
</div>

<style lang="scss">

.topBottomLayout {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1em;
}

</style>
