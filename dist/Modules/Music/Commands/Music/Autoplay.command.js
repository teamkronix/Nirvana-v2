import { Command } from "../../../../Structures/Command.structure.js";
export default class Autoplay extends Command {
    constructor(client) {
        super(client, {
            name: "autoplay",
            description: {
                content: "Enables/Disables the autoplay mode",
                examples: ["autoplay"],
                usage: "autoplay",
            },
            category: "Music",
            aliases: ["ap"],
            cooldown: 3,
            args: false,
            vote: true,
            player: {
                voice: true,
                dj: true,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ReadMessageHistory", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player) {
            embed.setColor(this.client.color.red)
                .setDescription(`**${ctx.author.tag}**, Play a song before using the command!`);
            return await ctx.sendMessage({
                embeds: [embed],
            });
        }
        const autoplay = player.autoplay;
        player.setAutoplay(!autoplay);
        if (autoplay) {
            embed.setColor(this.client.color.main)
                .setDescription(`**${ctx.author.tag}**, Autoplay has been **Disabled.**`);
        }
        else {
            embed.setColor(this.client.color.main)
                .setDescription(`**${ctx.author.tag}**, Autoplay has been **Enabled.**`);
        }
        await ctx.sendMessage({ embeds: [embed] });
    }
}
//# sourceMappingURL=Autoplay.command.js.map