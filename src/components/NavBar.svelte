<nav>
  <slot />
</nav>

<script lang="ts">
// Components
import MenuIcon from "@/components/icons/MenuIcon.svelte";
</script>

<style lang="scss">
@import "../shared";

nav {
    min-width: 300px;

    padding: dp(32);
    box-sizing: border-box;

    background-color: var(--md-sys-color-surface);
    color: var(--text-on-backdrop);

    :global(.fab) {
        width: 100%;
        margin-bottom: dp(48);
        justify-content: center;
    }
}

@media only screen and (max-width: $medium-breakpoint){
    nav {
        min-width: unset;
        padding: dp(32) dp(16);
    }
}

@media only screen and (max-width: $compact-breakpoint){
    nav {
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        gap: dp(8);
        padding: dp(12) 0 dp(16) 0;
    }
}

</style>
