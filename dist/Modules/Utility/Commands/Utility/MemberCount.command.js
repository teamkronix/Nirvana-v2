import { Command } from '../../../../Structures/Command.structure.js';
export default class MemberCount extends Command {
    constructor(client) {
        super(client, {
            name: "membercount",
            description: {
                content: "Returns membercount of a guild!",
                examples: ["mc"],
                usage: "membercount",
            },
            category: "Utility",
            aliases: ["mc"],
            cooldown: 3,
            args: false,
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx, args) {
        try {
            const guild = ctx.guild;
            const memberCount = guild.memberCount;
            const embed = this.client
                .embed()
                .setAuthor({ name: `${ctx.guild.name}`, iconURL: ctx.guild.iconURL() })
                .setColor(this.client.color.main)
                .setFields({ name: `MemberCount`, value: `${memberCount}` });
            ctx.sendMessage({ embeds: [embed] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
//# sourceMappingURL=MemberCount.command.js.map