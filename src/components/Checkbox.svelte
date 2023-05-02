<div>
  <input
    type="checkbox"
    class="checkbox"
  />
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
    />
  </svg>
</div>

<style lang="scss">

div {
    --size: 1em;
    --local-color: var(--tint-400);

    display: inline-block;
    position: relative;

    color: var(--text-on-pimary);

    &.disabled {
        --local-color: var(--disabled-color);
    }

    input {
        appearance: none;
        margin: 0;
        padding: 0;

        &:after {
            height: var(--size);
            width: var(--size);

            display: block;
            content: " ";

            border: 2px solid var(--local-color);
            border-radius: var(--border-radius-tiny);
            cursor: pointer;
            transition: 100ms var(--standard-easing) background-color;
        }

        &:disabled:after {
            cursor: default;
        }

        &:checked {
            &:after {
                background-color: var(--local-color);
            }

            & + svg {
                transform: translate(-50%, -70%) scale(1);
            }
        }
    }

    svg {
        height: 0.9em;
        width: 0.9em;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%) scale(0);

        font-size: var(--size);
        pointer-events: none;
        transition: 150ms var(--standard-easing) transform;
    }
}

</style>
