import { onMount, setContext } from "svelte";

export default function useContextListeners(name: string, listeners: Record<string, (...rest) => void>) {
  setContext(`${name}-listeners`, listeners);

  onMount(() => {
    return () => setContext(`${name}-listeners`, listeners);
  });
}
