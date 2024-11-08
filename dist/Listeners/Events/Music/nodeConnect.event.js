import { WebhookClient } from "discord.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeConnect extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "nodeConnect",
        });
    }
    async run(node) {
        this.client.logger.log("Node", `Node ${node} is ready!`);
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
                    value: `Ready!`,
                    inline: true,
                })
                    .setTimestamp(),
            ],
        });
    }
}
//# sourceMappingURL=nodeConnect.event.js.map
