<div class="colorSpan" style="background-color: #{hexColor};"></div>

<script lang="ts">
// Props
export var hexColor: string;
</script>

<style lang="scss">

.colorSpan {
    --size: 1.2em;

    height: var(--size);
    width: var(--size);

    display: inline-block;

    border-radius: var(--border-radius-tiny);
}

</style>
