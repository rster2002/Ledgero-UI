import { getContext } from "svelte";

export default function useContextCaller(name: string, listenerName: string) {
  const listeners = getContext(`${name}-listeners`);

  return (...args) => {
    if (listeners && listeners[listenerName]) {
      return listeners[listenerName](...args);
    }
  };
}
