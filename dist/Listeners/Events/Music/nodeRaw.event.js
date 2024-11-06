import Event from "../../../Structures/Event.structure.js";
export default class NodeRaw extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "nodeRaw",
        });
    }
    async run(message) {
        // this.client.logger.debug("Node Raw",message)
    }
}
//# sourceMappingURL=nodeRaw.event.js.map