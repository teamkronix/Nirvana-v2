import { Command } from "../../../../Structures/Command.structure.js";
export default class DestroyInvites extends Command {
    constructor(client) {
        super(client, {
            name: "invitedelete",
            description: {
                content: "Destroy all invite links created by the bot in a guild",
                examples: ["destroyinvites 0000000000000000000"],
                usage: "destroyinvites <guildId>",
            },
            category: "Dev",
            aliases: ["di"],
            cooldown: 3,
            args: true,
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
                    "ManageGuild",
                    "ReadMessageHistory",
                    "ViewChannel",
                ],
                user: [],
            },
            slashCommand: false,
            options: [],
        });
    }
    async run(client, ctx, args) {
        const guildId = args[0];
        const guild = client.guilds.cache.get(guildId);
        if (!guild) {
            return await ctx.sendMessage("Unable to find the Guild!");
        }
        try {
            const invites = await guild.invites.fetch();
            const botInvites = invites.filter((invite) => invite.inviter?.id === client.user?.id);
            for (const invite of botInvites.values()) {
                await invite.delete();
            }
            let embed = this.client
                .embed()
                .setColor(this.client.color.main)
                .setDescription(`Destroyed ${botInvites.size} invite(s) created by the Nirvana.`)
                .addFields({
                name: `Action By`,
                value: `${ctx.author.username}`,
            });
            await ctx.sendMessage({
                embeds: [embed],
            });
        }
        catch (_error) {
            await ctx.sendMessage("Failed to destroy invites!");
        }
    }
}
//# sourceMappingURL=invdelete.command.js.map