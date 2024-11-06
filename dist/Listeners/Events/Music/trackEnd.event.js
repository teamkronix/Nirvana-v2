import { REST } from "discord.js";
import Event from "../../../Structures/Event.structure.js";
export default class TrackEnd extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "trackEnd",
        });
    }
    async run(_player, track, dispatcher) {
        dispatcher.previous = dispatcher.current;
        dispatcher.current = null;
        const guild = await this.client.guilds.fetch(_player.guildId);
        const vcId = dispatcher.voiceChannelId;
        const rest = new REST({
            version: "10",
        }).setToken(this.client.config.token);
        const nowPlayingMessage = await dispatcher.nowPlayingMessage
            ?.fetch()
            .catch(() => null);
        switch (dispatcher.loop) {
            case "repeat":
                dispatcher.queue.unshift(track);
                break;
            case "queue":
                dispatcher.queue.push(track);
                break;
        }
        await dispatcher.play();
        if (dispatcher.autoplay) {
            await dispatcher.Autoplay(track);
        }
        if (nowPlayingMessage?.deletable) {
            await nowPlayingMessage.delete().catch(() => { });
        }
        await rest
            .put(`/channels/${vcId}/voice-status`, {
            body: {
                status: ``,
            },
        })
            .catch(() => { });
    }
}
//# sourceMappingURL=trackEnd.event.js.map