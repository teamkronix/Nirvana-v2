import { WebhookClient } from "discord.js";
import Event from '../../../Structures/Event.structure.js';
export default class GuildDelete extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "guildDelete",
        });
    }
    async run(_client, guild) {
        let owner;
        try {
            owner = await guild.members.fetch(guild.ownerId);
        }
        catch (error) {
            this.client.logger.error("Guild Delete", `Error fetching owner for guild ${guild.id}: ${error}`);
        }
        const embed = this.client
            .embed()
            .setAuthor({ name: `Guild Removed`, iconURL: guild.iconURL({ size: 1024 }) })
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setColor(this.client.color.main)
            .setDescription(`Details:-`)
            .addFields([
            { name: '- Name', value: `${guild.name}` },
            { name: '- Owner', value: owner ? owner.user.tag : "Unknown#0000" },
            { name: '- Members', value: guild.memberCount?.toString() || "Unknown" },
            { name: '- Created At', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>` },
            { name: '- Removed At', value: `<t:${Math.floor(Date.now() / 1000)}:F>` },
            { name: `- Guild ID`, value: `${guild.id}` }
        ])
            .setFooter({ text: `Connected to ${this.client.guilds.cache.size} guilds`, iconURL: this.client.user.displayAvatarURL() })
            .setTimestamp();
        const hook = new WebhookClient({ url: this.client.config.webhooks.leaves });
        await hook.send({ embeds: [embed] });
    }
}
//# sourceMappingURL=GuildDelete.event.js.map