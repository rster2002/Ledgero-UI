<button on:click>
    <slot />
</button>

<style lang="scss">

button {
    padding: 0.75em 2em;

    border-radius: 0.5em;
    background-color: var(--accent-color);
    color: var(--text-on-accent);
    font-weight: 700;
    font-size: 0.8em;
    border: 2px solid var(--accent-color);
    box-sizing: border-box;
    cursor: pointer;
    transition: all 150ms var(--standard-easing);
    transition-property: color, background-color;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;

    &:hover {
        background-color: transparent;
        color: var(--accent-color);
    }

    :global(svg) {
        font-size: 1.4em;
    }

    &.warning {
        --accent-color: var(--error-color);
    }
}

</style>
