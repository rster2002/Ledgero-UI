<div class="inlinePage {open && 'open'}">
  <header>
    <button on:click={close}>
      <ArrowLeftIcon />
    </button>

    <h2>
      {title}
    </h2>
  </header>

  <div class="content">
    <slot />
  </div>
</div>

<script lang="ts">
// Imports
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher()

// Components
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.svelte";

// Props
export var open = false;
export var title: string;

// Functions
function close() {
    open = false;
    dispatch("close");
}
</script>

<style lang="scss">
@import "../shared";

.inlinePage {
    display: contents;
}

.content {
    display: contents;
}

header {
    height: dp(56);

    display: none;
    flex-direction: row;
    align-items: center;

    button {
        margin: 0;
        padding: 0 dp(16);

        font-size: dp(24);
        outline: 0;
        border: 0;
        background-color: transparent;
    }

    h2 {
        margin: 0;

        color: var(--md-sys-color-on-surface);
        @include mdl-font(title-large);
    }
}

@media only screen and (max-width: $compact-breakpoint) {
    .inlinePage {
        height: 100%;
        width: 100%;

        display: none;
        position: fixed;
        top: 0;
        left: 0;

        background-color: var(--md-sys-color-surface);

        header {
            display: flex;
        }

        .content {
            display: block;

            padding: dp(24);
            box-sizing: border-box;
            overflow-y: auto;
        }

        &.open {
            display: flex;
            flex-direction: column;
        }
    }
}

</style>
