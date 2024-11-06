export default class Module {
    client;
    nessary;
    file;
    name;
    required;
    constructor(client, file, options) {
        this.client = client;
        this.file = file;
        this.name = options.name;
        this.required = options.required || false;
    }
    async load(..._args) {
        return await Promise.resolve();
    }
    async unload(..._args) {
        return await Promise.resolve();
    }
}
//# sourceMappingURL=Module.structure.js.map