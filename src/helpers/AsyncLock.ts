/**
 * Allows multiple related promises that run in a global context to await each other.
 */
export default class AsyncLock {
    private responders: any[] = [];
    private locked = false;

    /**
     * Returns a promise which needs to be awaited. The promise will resolve in
     * the following situations:
     *
     * 1. The caller is the first one to call this method on this lock, in which
     *    case the promise will resolve immediately, but will set the lock to a
     *    `locked` state.
     * 2. The caller is not the first caller and the lock is in it's `locked`
     *    state in which case the first caller first needs to have called
     *    `.release()` before the promise resolves.
     */
    lock(): Promise<unknown> {
        if (!this.locked) {
            this.locked = true;
            return Promise.resolve();
        }

        let responder: any;
        const promise = new Promise((res) => (responder = res));

        this.responders.push(responder);

        return promise;
    }

    /**
     * Releases the lock allowing other callers to continue or causes the lock to
     * be unlocked in its entirety. Remember to call this method in each possible
     * code path, as otherwise the lock might stay locked indefinitely.
     */
    release() {
        if (this.responders.length === 0) {
            this.locked = false;
            return;
        }

        const resolver = this.responders.shift();
        resolver();
    }
}
