<button class="fab">
  <slot />
</button>

<style lang="scss">
@import "../shared";

.fab {
    height: dp(56);
    min-width: dp(80);

    display: flex;
    align-items: center;
    gap: 0.75em;
    padding: 1em;

    border-radius: var(--border-radius-large);
    border: 0;
    cursor: pointer;
    box-shadow: #b6a1f0 0 0 0.5em;
    background-color: var(--accent-color);
    color: var(--text-on-accent);
    font-family: var(--font-label-large-font-family);
    font-size: var(--font-label-large-font-size);
    font-weight: var(--font-label-large-weight);
    line-height: var(--font-label-large-line-height);
    letter-spacing: var(--font-label-large-tracking);

    :global(svg) {
        font-size: 1.5em;
    }
}

@media only screen and (max-width: $medium-breakpoint){
    .fab {
        min-width: unset;
        width: dp(56);

        :global(span) {
            display: none;
        }
    }
}

@media only screen and (max-width: $compact-breakpoint){
    button.fab {
        width: unset;

        position: fixed;
        bottom: dp(64);
        right: dp(16);

        :global(span) {
            display: initial;
        }
    }
}

</style>
