<button on:click>
  <slot />
</button>

<style lang="scss">

button {
    padding: 0.5em 0.7em;
    display: inline-block;

    font-size: 1.2em;
    background-color: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;

    &:hover {
        color: var(--accent-color);
    }
}

</style>
