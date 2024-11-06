import { Command } from "../../../../Structures/Command.structure.js";
export default class GuildList extends Command {
    constructor(client) {
        super(client, {
            name: "guildlist",
            description: {
                content: "List all guilds the bot is in",
                examples: ["guildlist"],
                usage: "guildlist",
            },
            category: "Dev",
            aliases: ["glist"],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: [
                    "SendMessages",
                    "ReadMessageHistory",
                    "ViewChannel",
                    "EmbedLinks",
                ],
                user: [],
            },
            slashCommand: false,
            options: [],
        });
    }
    async run(client, ctx) {
        const serverlist = client.guilds.cache.map((guild, i) => `\`\`\`Server Name: ${guild.name}\nGuild ID: ${guild.id}\nMember Count: ${guild.memberCount}\`\`\``);
        const chunks = this.client.botfunctions.chunk(serverlist, 10);
        const pages = chunks.map((chunk, index) => {
            return this.client
                .embed()
                .setColor(this.client.color.main)
                .setDescription(chunk.join("\n"))
                .setFooter({ text: `Page ${index + 1} of ${chunks.length}` });
        });
        await this.client.botfunctions.paginate(client, ctx, pages);
    }
}
//# sourceMappingURL=guildlist.command.js.map