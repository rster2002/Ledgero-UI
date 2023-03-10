export default function focus(element: HTMLElement) {
    setTimeout(() => {
        element.focus();
    });

    return {
        destroy() {},
    }
}
