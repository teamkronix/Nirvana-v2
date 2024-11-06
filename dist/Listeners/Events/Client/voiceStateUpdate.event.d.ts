import { type VoiceState } from "discord.js";
import Event from "../../../Structures/Event.structure.js";
import { Bot } from "../../../Clients/Bot.client.js";
export default class VoiceStateUpdate extends Event {
    constructor(client: Bot, file: string);
    run(_oldState: VoiceState, newState: VoiceState): Promise<void>;
}
