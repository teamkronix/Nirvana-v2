import { WebhookClient } from "discord.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeDestroy extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "nodeDestroy",
        });
    }
    async run(node, code, reason) {
        // this.client.logger.warn(
        //   "Node",
        //   ` closed with code ${code} and reason ${reason}`
        // );
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
                    value: `Closed [\`${code}\`]`,
                    inline: true,
                }, {
                    name: `Reason`,
                    value: `${reason}`,
                    inline: false,
                })
                    .setTimestamp(),
            ],
        });
    }
}
//# sourceMappingURL=nodeDestroy.event.js.map