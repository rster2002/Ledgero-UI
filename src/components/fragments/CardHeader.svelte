<header class="cardHeader">
  <slot />
</header>

<style lang="scss">

.cardHeader {
    margin-bottom: 1em;

    :global(h2) {
        margin: 0;
        font-family: var(--header-face);
    }
}

</style>
