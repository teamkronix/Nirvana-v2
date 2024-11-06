import Event from '../../../Structures/Event.structure.js';
export default class Debug extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'Debug',
        });
    }
    async run(_client, args) {
        this.client.logger.debug("Client", args);
    }
}
//# sourceMappingURL=Debug.event.js.map