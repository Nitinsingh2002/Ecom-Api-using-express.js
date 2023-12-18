export class ApllicationError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code
    }
}