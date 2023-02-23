{#each items as item, i}
  <slot {item} drag={createAction(i)} />
{/each}

<script lang="ts">
// Imports
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Props
export var items: unknown[];

// Function
function createAction(index: number) {
    return function action(node: HTMLElement) {
        node.setAttribute("draggable", "true");
        node.setAttribute("data-index", String(index));

        const dragStart = (event: DragEvent) => {
            event.dataTransfer.setData("sourceIndex", event.target.dataset.index);
        };

        const drop = (event: DragEvent) => {
            event.preventDefault();
            let v: HTMLElement = event.composedPath()
                .find(i => i.draggable);

            if (v) {
                let fromIndex = Number(event.dataTransfer.getData("sourceIndex"));
                let toIndex = Number(v.dataset.index);

                let [itemToMove] = items.splice(fromIndex, 1);
                items.splice(toIndex, 0, itemToMove);
                items = items;
                dispatch("change");
            }
        };

        const prevent = (event: DragEvent) => event.preventDefault();

        node.addEventListener("dragstart", dragStart);
        node.addEventListener("dragover", prevent);
        node.addEventListener("dragleave", prevent);
        node.addEventListener("drop", drop);

        return {
            destroy() {
                node.removeAttribute("data-index");
                node.removeAttribute("draggable");
                node.removeEventListener("dragstart", dragStart);
                node.removeEventListener("drop", drop);
                node.removeEventListener("dragover", dragStart);
                node.removeEventListener("dragleave", prevent);
            },
        };
    }
}
</script>
