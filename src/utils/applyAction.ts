export type Action<T> = (node: HTMLElement, options?: T) => { destroy() }

export default function applyAction<T>(target: HTMLElement, action: Action<T>, options?: T) {
    const actionInstance = action(target, options);

    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            const removed = Array.from(mutation.removedNodes).includes(target);

            if (removed) {
                actionInstance?.destroy?.();
            }
        }
    });

    observer.observe(target.parentNode, {
        attributes: false,
        subtree: false,
        childList: true,
    });
}
