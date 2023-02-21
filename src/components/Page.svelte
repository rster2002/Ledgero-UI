<section>
    <div class="inner">
        <slot />
    </div>
</section>

<style lang="scss">

section {
    width: 100%;
    height: 100%;

    padding: 4em;
    box-sizing: border-box;
    overflow-y: auto;

    .inner {
        min-height: 100%;
        width: 100%;
        max-width: 950px;

        margin: auto;
    }
}

</style>
