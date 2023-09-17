<section class="page">
  <slot />
</section>

<style lang="scss">
@use "../scss/dp";

.page {
    height: 100%;
    width: 100%;

    padding: dp.dp(32);
    box-sizing: border-box;
}

</style>
