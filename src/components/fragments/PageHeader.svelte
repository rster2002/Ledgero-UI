<header>
  <slot />

  <div class="right">
    <slot name="right" />
  </div>
</header>

<style lang="scss">

header {
    position: relative;
    margin-bottom: 3.5em;

    :global(h1) {
        font-size: 2.3em;
        margin: 0;

        :global(svg) {
            margin-right: 0.4em;
        }
    }

    .right {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}

</style>
