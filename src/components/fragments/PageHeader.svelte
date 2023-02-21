<header>
  <slot />
</header>

<style lang="scss">

header {
    margin-bottom: 3.5em;

    :global(h1) {
        font-size: 2.3em;
        margin: 0;

        :global(svg) {
            margin-right: 0.4em;
        }
    }
}

</style>
