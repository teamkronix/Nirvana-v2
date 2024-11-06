import { Command } from '../../../../Structures/Command.structure.js';
export default class Blacklist extends Command {
    constructor(client) {
        super(client, {
            name: 'blacklist',
            description: {
                content: 'blacklists a specific guild/user.',
                examples: ['add/remove user/guild ID'],
                usage: '<add/remove> <User/Guild> <Id>',
            },
            category: 'Dev',
            aliases: ['bl'],
            cooldown: 3,
            args: true,
            isPremium: false,
            permissions: {
                dev: true,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: false,
            options: [],
        });
    }
    async run(client, ctx, args) {
        if (!args[0])
            return ctx.sendMessage("please enter a valid action - add/remove");
        if (!args[1])
            return ctx.sendMessage("Please enter User Or Guild");
        if (!args[2])
            return ctx.sendMessage("please enter a valid id.");
        let action = args[0].toLowerCase();
        let type = args[1].toLowerCase();
        let id = args[2].toLowerCase();
        const res = this.client.db.blacklist(type, id, action, ctx);
    }
}
//# sourceMappingURL=blacklist.command.js.map