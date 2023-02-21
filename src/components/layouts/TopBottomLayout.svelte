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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1em;
}

</style>
