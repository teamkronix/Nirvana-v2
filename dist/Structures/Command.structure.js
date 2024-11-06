/* eslint-disable no-unused-vars */
export class Command {
    client;
    name;
    description;
    aliases;
    cooldown;
    args;
    vote;
    isPremium;
    premiumTier;
    player;
    permissions;
    slashCommand;
    options;
    category;
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.description = {
            content: options.description
                ? options.description.content || "No description provided"
                : "No description provided",
            usage: options.description
                ? options.description.usage || "No usage provided"
                : "No usage provided",
            examples: options.description
                ? options.description.examples || [""]
                : [""],
        };
        this.aliases = options.aliases || [];
        this.cooldown = options.cooldown || 3;
        this.args = options.args || false;
        this.vote = options.vote ?? false;
        this.isPremium = options.isPremium || false;
        this.player = {
            voice: options.player?.voice ?? false,
            dj: options.player?.dj ?? false,
            active: options.player?.active ?? false,
            djPerm: options.player?.djPerm ?? null,
        };
        this.permissions = {
            dev: options.permissions ? options.permissions.dev || false : false,
            client: options.permissions
                ? options.permissions.client || []
                : ["SendMessages", "ViewChannel", "EmbedLinks"],
            user: options.permissions ? options.permissions.user || [] : [],
        };
        this.slashCommand = options.slashCommand || false;
        this.options = options.options || [];
        this.category = options.category || "general";
    }
    async run(_client, _message, _args) {
        return await Promise.resolve();
    }
}
//# sourceMappingURL=Command.structure.js.map