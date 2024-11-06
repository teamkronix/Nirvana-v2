import { WebhookClient } from "discord.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeDisconnect extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "nodeDisconnect",
        });
    }
    async run(node) {
        //this.client.logger.log("Node", `Node ${node} Disconnected!`);
        const hook = new WebhookClient({
            url: this.client.config.webhooks.nodelog,
        });
        await hook.send({
            embeds: [
                this.client
                    .embed()
                    .setColor(this.client.color.main)
                    .setFields({
                    name: `Node`,
                    value: `${node}`,
                    inline: true,
                }, {
                    name: `Status`,
                    value: `Disconnected!`,
                    inline: true,
                })
                    .setTimestamp(),
            ],
        });
    }
}
//# sourceMappingURL=nodeDisconnect.event.js.map