import { Command } from "../../../../Structures/Command.structure.js";
export default class Pause extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            description: {
                content: "Pauses the current song",
                examples: ["pause"],
                usage: "pause",
            },
            category: "Music",
            aliases: ["pausemusic"],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (player.paused) {
            embed.setColor(this.client.color.main)
                .setDescription(`**${ctx.author.username}**, Player is already **paused**.`);
            return await ctx.sendMessage({
                embeds: [embed]
            });
        }
        player.pause();
        if (ctx.isInteraction) {
            return await ctx.sendMessage({
                content: "**Paused** The Player.",
                ephemeral: true,
            });
        }
        return await ctx.message?.react("⏸");
    }
}
//# sourceMappingURL=Pause.command.js.map