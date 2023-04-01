<div class="divider">
  <span>{label}</span>
</div>

<script lang="ts">
// Props
export var label: string = "";
</script>

<style lang="scss">

.divider {
    height: 2px;

    position: relative;

    background-color: currentColor;

    span {
        position: absolute;
        top: -0.55em;
        left: 0.7em;
        padding: 0 0.5em;

        background-color: var(--background);
        font-size: 0.8em;
        font-weight: 700;
        font-family: var(--header-face);
    }
}

</style>
