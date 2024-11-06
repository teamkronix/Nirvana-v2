export default class Event {
    client;
    once;
    file;
    name;
    fileName;
    constructor(client, file, options) {
        this.client = client;
        this.file = file;
        this.name = options.name;
        this.once = options.once || false;
        this.fileName = file.split('.')[0];
    }
    async run(..._args) {
        return await Promise.resolve();
    }
}
//# sourceMappingURL=Event.structure.js.map