<div class="cardStat">
    <h1>
      <span>{label}</span>
    </h1>
    <h2>
        <slot />
    </h2>
</div>

<script lang="ts">
// Props
export var label: string;
</script>

<style lang="scss">

.cardStat {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
}

h1, h2 {
    margin: 0;

    font-family: var(--header-face);
}

span {
    background-color: var(--tint-100);
    color: var(--tint-500);
    border-radius: var(--border-radius-round);
    padding: 0 0.7em;
}

h2 {
    font-size: 2.5em;
    font-weight: 900;
}

</style>
