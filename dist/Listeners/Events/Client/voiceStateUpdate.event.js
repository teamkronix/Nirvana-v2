import { ChannelType } from "discord.js";
import Event from "../../../Structures/Event.structure.js";
export default class VoiceStateUpdate extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "voiceStateUpdate",
        });
    }
    async run(_oldState, newState) {
        const guildId = newState.guild.id;
        if (!guildId)
            return;
        const player = this.client.queue.get(guildId);
        if (!player)
            return;
        const vcConnection = player.player.node.manager.connections.get(guildId);
        if (!vcConnection?.channelId)
            return player.destroy();
        const vc = newState.guild.channels.cache.get(vcConnection.channelId);
        if (!(vc && vc.members instanceof Map))
            return;
        if (!newState.guild.members.cache.get(this.client.user.id)?.voice.channelId) {
            const is247 = await this.client.db.get247(newState.guild.id);
            if (!is247 && player) {
                return player.destroy();
            }
        }
        if (newState.id === this.client.user.id &&
            newState.channelId &&
            newState.channel.type === ChannelType.GuildStageVoice &&
            newState.guild.members.me.voice.suppress) {
            if (newState.guild.members.me.permissions.has(["Connect", "Speak"]) ||
                newState.channel.permissionsFor(newState.guild.members.me).has("MuteMembers")) {
                await newState.guild.members.me.voice.setSuppressed(false).catch(() => { });
            }
        }
        if (newState.id === this.client.user.id)
            return;
        if (newState.id === this.client.user.id &&
            !newState.serverDeaf &&
            vc.permissionsFor(newState.guild.members.me).has("DeafenMembers")) {
            await newState.setDeaf(true);
        }
        if (newState.id === this.client.user.id && newState.serverMute && !player.paused) {
            player.pause();
        }
        if (newState.id === this.client.user.id && !newState.serverMute && player.paused) {
            player.pause();
        }
        if (vc.members instanceof Map && [...vc.members.values()].filter((x) => !x.user.bot).length <= 0) {
            const is247 = await this.client.db.get247(newState.guild.id);
            setTimeout(async () => {
                const vcConnection = player.player.node.manager.connections.get(guildId);
                if (!vcConnection?.channelId)
                    return;
                const playerVoiceChannel = newState.guild.channels.cache.get(vcConnection.channelId);
                if (player &&
                    playerVoiceChannel &&
                    playerVoiceChannel.members instanceof Map &&
                    [...playerVoiceChannel.members.values()].filter((x) => !x.user.bot).length <= 0) {
                    if (!is247) {
                        player.destroy();
                    }
                }
            }, 5000);
        }
    }
}
//# sourceMappingURL=voiceStateUpdate.event.js.map