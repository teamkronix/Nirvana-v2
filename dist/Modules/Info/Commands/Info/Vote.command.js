import { Command } from '../../../../Structures/Command.structure.js';
import { Emoji } from '../../../../utils/Emotes.utils.js';
export default class Vote extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            description: {
                content: 'The info command of the bot.',
                examples: ['botinfo'],
                usage: 'botinfo',
            },
            category: 'Info',
            aliases: ['votenirvana', 'topgg'],
            cooldown: 3,
            args: false,
            isPremium: false,
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const compos = [
            {
                type: 2,
                style: 5,
                label: "Vote",
                url: "https://top.gg/bot/1044688839005966396/vote",
                emoji: Emoji.vote
            }
        ];
        ctx.sendMessage({
            content: "Here You Go !",
            components: [
                {
                    type: 1,
                    components: compos,
                }
            ]
        });
    }
}
//# sourceMappingURL=Vote.command.js.map