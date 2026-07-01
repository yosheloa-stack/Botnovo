// callplay/queue.js
// Simple sequential FIFO queue: one call is placed at a time.
class CallQueue {
    constructor() {
        this.items = [];
        this.processing = false;
    }

    push(job) {
        this.items.push(job);
        return this.items.length; // position in queue (1-based)
    }

    async run(processFn) {
        if (this.processing) return;
        this.processing = true;
        while (this.items.length) {
            const job = this.items.shift();
            try {
                await processFn(job);
            } catch (err) {
                console.error('Erro processando job da fila callplay:', err);
                if (job.onError) await job.onError(err);
            }
        }
        this.processing = false;
    }
}

module.exports = new CallQueue();
