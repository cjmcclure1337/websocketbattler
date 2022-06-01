module.exports = class TextMessage {
    constructor ({text, onComplete}, socket) {
        this.text = text;
        this.onComplete = onComplete;
        this.socket = socket;
    }

    init() {
        this.socket.send(this.text);
        this.socket.addEventListener("message", () => {
            this.onComplete();
        } ,{once: true})
    }
}