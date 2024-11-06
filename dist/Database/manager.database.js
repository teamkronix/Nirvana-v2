import Caching from '../Services/Caching.service.js';
import Connect from './connect.database.js';
import PrefixSchema from './Schemas/Prefix.schema.js';
import config from '../config.json' with { type: "json" };
import PremiumSchema from './Schemas/Premium.schema.js';
import UserSchema from './Schemas/User.schema.js';
import GuildSchema from './Schemas/Guild.schema.js';
export default class DataBase {
    client;
    cache;
    constructor(client) {
        this.client = client;
        if (client.config.use_cache) {
            this.cache = new Caching(client);
            this.cacheEventHandler();
        }
        if (!this.client.config.use_cache)
            this.client.logger.warn("Caching", "Caching is disabled , Bot running without caching.");
        new Connect(client).connect();
    }
    async cacheEventHandler() {
        this.cache.on('connect', () => {
            this.client.logger.event("Caching", `Connected to redis server at ${this.cache.options.host}:${this.cache.options.port}`);
        });
        this.cache.on('ready', () => {
            this.client.logger.event("Caching", `Redis server ready at ${this.cache.options.host}:${this.cache.options.port}`);
        });
        this.cache.on('error', (err) => {
            this.client.logger.error("Caching", `${err}`);
        });
        this.cache.on('close', () => {
            this.client.logger.warn("Caching", `Redis server closed at ${this.cache.options.host}:${this.cache.options.port}`);
        });
        this.cache.on('connecting', () => {
            this.client.logger.warn("Caching", `Redis server connecting at ${this.cache.options.host}:${this.cache.options.port}`);
        });
    }
    async getPrefix(gId) {
        if (this.client.config.use_cache) {
            if (await this.cache.checkValue(`${this.client.user.id}_prefix_${gId}`)) {
                return await this.cache.getValue(`${this.client.user.id}_prefix_${gId}`);
            }
            else {
                let data = await PrefixSchema.findOne({ guildId: gId });
                if (!data) {
                    this.cache.setValue(`${this.client.user.id}_prefix_${gId}`, config.prefix);
                    return config.prefix;
                }
                else {
                    this.cache.setValue(`${this.client.user.id}_prefix_${gId}`, data.prefix);
                    return data.prefix;
                }
            }
        }
        else {
            let data = await PrefixSchema.findOne({ guildId: gId });
            if (!data) {
                return config.prefix;
            }
            else {
                return data.prefix;
            }
        }
    }
    async hasNoPrefix(uId) {
        if (this.client.config.use_cache) {
            if (await this.cache.checkValue(`${this.client.user.id}_noprefix_${uId}`)) {
                return true;
            }
            else {
                const data = await UserSchema.findOne({ userId: uId });
                if (data.hasNoPrefix) {
                    this.cache.setValue(`${this.client.user.id}_noprefix_${uId}`, "true");
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            const data = await UserSchema.findOne({ userId: uId });
            if (!data)
                return false;
            if (data.hasNoPrefix) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    async addNoPrefix(uId) {
        if (this.client.config.use_cache) {
            await this.cache.setValue(`${this.client.user.id}_noprefix_${uId}`, "true");
        }
        const data = await UserSchema.findOne({ userId: uId });
        if (!data) {
            await UserSchema.create({ userId: uId, hasNoPrefix: true });
            return true;
        }
        else {
            if (!data.hasNoPrefix) {
                await UserSchema.findOneAndUpdate({ userId: uId }, { hasNoPrefix: true });
                return true;
            }
        }
    }
    async delNoPrefix(uId) {
        const data = await UserSchema.findOne({ userId: uId });
        if (this.client.config.use_cache) {
            await this.cache.delValue(`${this.client.user.id}_noprefix_${uId}`);
        }
        if (!data) {
            return false;
        }
        else {
            if (!data.hasNoPrefix) {
                return false;
            }
            else {
                await UserSchema.findOneAndUpdate({ userId: uId }, { hasNoPrefix: false });
                return true;
            }
        }
    }
    async setPrefix(gId, pre) {
        if (this.client.config.use_cache) {
            await this.cache.updateValue(`${this.client.user.id}_prefix_${gId}`, pre);
        }
        await PrefixSchema.create({ guildId: gId, prefix: pre }).then((r) => { return r; });
    }
    async deletePrefix(gId) {
        await PrefixSchema.deleteOne({ guildId: gId });
        if (this.client.config.use_cache) {
            await this.cache.updateValue(`${this.client.user.id}_prefix_${gId}`, this.client.config.prefix);
        }
    }
    async blacklist(type, Id, action, ctx) {
        switch (type) {
            case 'user':
                const user = await this.client.users.fetch(Id).catch(err => { });
                if (!user)
                    return ctx.sendMessage("Can't fetch that user.");
                const userdata = await UserSchema.findOne({ userId: Id });
                switch (action) {
                    case 'add':
                        if (!userdata) {
                            await UserSchema.create({ userId: Id, isBlacklisted: true });
                            if (this.client.config.use_cache) {
                                await this.cache.setValue(`${this.client.user.id}_isBl_user${Id}`, `true`);
                            }
                            await user.send("U have been blacklisted from using our services");
                            return ctx.sendMessage("User blacklisted successfully.");
                        }
                        else {
                            if (!userdata.isBlacklisted) {
                                await UserSchema.findOneAndUpdate({ userId: Id }, { isBlacklisted: true });
                                if (this.client.config.use_cache) {
                                    await this.cache.setValue(`${this.client.user.id}_isBl_user${Id}`, `true`);
                                }
                                await user.send("You have been blacklisted from using our services");
                                return ctx.sendMessage("User blacklisted successfully.");
                            }
                            else {
                                if (this.client.config.use_cache) {
                                    await this.cache.setValue(`${this.client.user.id}_isBl_user${Id}`, `true`);
                                }
                                return ctx.sendMessage("User already blacklisted.");
                            }
                        }
                    case 'remove':
                        if (!userdata || !userdata.isBlacklisted) {
                            if (this.client.config.use_cache) {
                                await this.cache.setValue(`${this.client.user.id}_isBl_user${Id}`, `false`);
                            }
                            return ctx.sendMessage("User not blacklisted.");
                        }
                        else {
                            await UserSchema.findOneAndUpdate({ userId: Id }, { isBlacklisted: false });
                            if (this.client.config.use_cache) {
                                await this.cache.setValue(`${this.client.user.id}_isBl_user${Id}`, `false`);
                            }
                            await ctx.sendMessage("User succesfully removed from my blacklist list.");
                            await user.send("You are no more blacklisted from using our services");
                        }
                        break;
                    default:
                        return ctx.sendMessage("Please Enter A Valid Action.");
                }
            case 'guild':
                const guild = await this.client.guilds.fetch(Id).catch(err => { });
                if (!guild)
                    return ctx.sendMessage("can't fetch that guild.");
                const guilddata = await GuildSchema.findOne({ guildId: Id });
                switch (action) {
                    case 'add':
                        if (!guilddata) {
                            await GuildSchema.create({ guildId: Id, isBlacklisted: true });
                            if (this.client.config.use_cache) {
                                await this.cache.setValue(`${this.client.user.id}_isBl_guild${Id}`, `true`);
                            }
                            (await this.client.users.fetch(guild.ownerId)).send(`${guild.name} is now blacklisted from using our services.`);
                            return ctx.sendMessage("Guild blacklisted.");
                        }
                        else {
                            if (!guilddata.isBlacklisted) {
                                await GuildSchema.findOneAndUpdate({ guildId: Id }, { isBlacklisted: true });
                                if (this.client.config.use_cache) {
                                    await this.cache.setValue(`${this.client.user.id}_isBl_guild${Id}`, `true`);
                                }
                                (await this.client.users.fetch(guild.ownerId)).send(`${guild.name} is now blacklisted from using our services.`);
                                return ctx.sendMessage("Guild blacklisted.");
                            }
                            else {
                                if (this.client.config.use_cache) {
                                    await this.cache.setValue(`${this.client.user.id}_isBl_guild${Id}`, `true`);
                                }
                                return ctx.sendMessage("Guild already blacklisted.");
                            }
                        }
                    case 'remove':
                        if (!guilddata || !guilddata.isBlacklisted) {
                            return ctx.sendMessage("Guild not blacklisted.");
                        }
                        else {
                            if (this.client.config.use_cache) {
                                await this.cache.setValue(`${this.client.user.id}_isBl_guild${Id}`, `false`);
                            }
                            await GuildSchema.findOneAndUpdate({ guildId: Id }, { isBlacklisted: false });
                            await ctx.sendMessage("Guild removed from blacklist.");
                            await (await this.client.users.fetch(guild.ownerId)).send(`${guild.name} is no more blacklisted from using our services.`);
                        }
                    default:
                        return ctx.sendMessage("Please Enter A Valid Action.");
                }
            default:
                return ctx.sendMessage("Please select a valid type - guild/user.");
        }
    }
    async isBlacklisted(userid, guildid) {
        if (this.client.config.use_cache) {
            if (this.cache.checkValue(`${this.client.user.id}_isBl_user${userid}`)) {
                const val = Boolean(this.cache.getValue(`${this.client.user.id}_isBl_user${userid}`));
                if (val) {
                    return val;
                }
            }
            else {
                const userdata = await UserSchema.findOne({ userId: userid });
                await this.cache.setValue(`${this.client.user.id}_isBl_user${userid}`, `${userdata.isBlacklisted}`);
                if (userdata.isBlacklisted) {
                    return true;
                }
            }
            if (this.cache.checkValue(`${this.client.user.id}_isBl_guild${guildid}`)) {
                const val = Boolean(this.cache.getValue(`${this.client.user.id}_isBl_guild${guildid}`));
                if (val) {
                    return val;
                }
            }
            else {
                const guilddata = await GuildSchema.findOne({ guildId: guildid });
                await this.cache.setValue(`${this.client.user.id}_isBl_guild${guildid}`, `${guilddata.isBlacklisted}`);
                if (guilddata.isBlacklisted) {
                    return true;
                }
            }
            return false;
        }
        else {
            const userdata = await UserSchema.findOne({ userId: userid });
            const guilddata = await GuildSchema.findOne({ guildId: guildid });
            if (guilddata) {
                if (guilddata.isBlacklisted) {
                    return true;
                }
            }
            if (userdata) {
                if (userdata.isBlacklisted) {
                    return true;
                }
            }
            return false;
        }
    }
    async checkPremium(gId) {
        const data = await PremiumSchema.findOne({ guildId: gId });
        if (data) {
            return true;
        }
        else {
            return false;
        }
    }
    async checkDjRole(guildid) {
        const data = await GuildSchema.findOne({ guildId: guildid });
        if (!data)
            return null;
    }
    async getUser(uId) {
        const data = await UserSchema.findOne({ userId: uId });
        let d;
        if (!data) {
            await UserSchema.create({ userId: uId }).then((r) => {
                d = r;
            });
            return d;
        }
        else {
            return data;
        }
    }
    async get247(guildId) {
        const data = await GuildSchema.findOne({ guildId: guildId });
        if (!data)
            return false;
        if (!data._247.isEnabled)
            return false;
        return true;
    }
    async set247(voiceId, channelId, ctx, action) {
        const data = await GuildSchema.findOne({ guildId: ctx.guild.id });
        switch (action) {
            case "enable":
                if (!data) {
                    await GuildSchema.create({
                        guildId: ctx.guild.id, _247: {
                            voice_id: voiceId,
                            text_id: channelId,
                            isEnabled: true
                        }
                    });
                    return ctx.sendMessage("Enabled 24/7 mode for this server.");
                }
                else {
                    if (data._247.isEnabled)
                        return ctx.sendMessage("24/7 mode already enabled.");
                    await GuildSchema.updateOne({ guildId: ctx.guild.id }, {
                        _247: {
                            voice_id: voiceId,
                            text_id: channelId,
                            isEnabled: true
                        }
                    });
                    return ctx.sendMessage("24/7 mode enabled.");
                }
            case "disable":
                if (!data)
                    return ctx.sendMessage("24/7 mode already disabled.");
                if (!data._247.isEnabled)
                    return ctx.sendMessage("24/7 mode already disabled.");
                await GuildSchema.updateOne({ guildId: ctx.guild.id }, {
                    _247: {
                        voice_id: "",
                        text_id: "",
                        isEnabled: false
                    }
                });
                ctx.sendMessage('Disabled 24/7 mode for this server.');
                break;
            default:
                ctx.sendMessage("please use a valid arguments \`enable/disable\`.");
        }
    }
    async ignore(guildid, channelid, ctx, action) {
        const data = await GuildSchema.findOne({ guildId: guildid });
        switch (action) {
            case 'add':
                if (!data) {
                    await GuildSchema.create({
                        guildId: guildid, $push: {
                            ignorechannels: channelid
                        }
                    });
                    return ctx.sendMessage("channel added to my ignore list");
                }
                else {
                    if (data.ignorechannels.includes(channelid))
                        return ctx.sendMessage("channel already added in my Ignore list.");
                    await GuildSchema.findOneAndUpdate({
                        guildId: guildid
                    }, {
                        $push: {
                            ignorechannels: channelid
                        }
                    });
                }
        }
    }
}
//# sourceMappingURL=manager.database.js.map