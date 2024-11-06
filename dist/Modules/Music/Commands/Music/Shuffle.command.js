import { Command } from "../../../../Structures/Command.structure.js";
export default class Shuffle extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            description: {
                content: "Starts shuffling the queue",
                examples: ["shuffle"],
                usage: "shuffle",
            },
            category: "Music",
            aliases: ["sh"],
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
        if (!player.queue.length) {
            embed.setColor(this.client.color.red)
                .setDescription(`**${ctx.author.tag}**, Music queue is empty!`);
            return await ctx.sendMessage({
                embeds: [embed],
            });
        }
        player.setShuffle();
        embed.setColor(this.client.color.main)
            .setDescription(`**${ctx.author.tag}**, Shuffling the queue.`);
        return await ctx.sendMessage({
            embeds: [embed],
        });
    }
}
//# sourceMappingURL=Shuffle.command.js.map