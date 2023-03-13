<button on:click>
  <span>
    <slot />
  </span>
</button>

<style lang="scss">

button {
    min-height: 200px;

    background-color: transparent;
    border: 0;
    border-radius: var(--border-radius-medium);
    color: var(--accent-color);
    font-family: var(--header-face);
    cursor: pointer;
    transition: 150ms all var(--standard-easing);

    span {
        font-size: 1.5em;
    }

    &:hover {
        background-color: var(--tint-100);
    }
}

</style>
