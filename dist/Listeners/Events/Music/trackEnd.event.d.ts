import type { Player } from "shoukaku";
import type { Song } from "../../../Modules/Music/Dispatcher.music.js";
import type Dispatcher from "../../../Modules/Music/Dispatcher.music.js";
import Event from "../../../Structures/Event.structure.js";
import { Bot } from "../../../Clients/Bot.client.js";
export default class TrackEnd extends Event {
    constructor(client: Bot, file: string);
    run(_player: Player, track: Song, dispatcher: Dispatcher): Promise<void>;
}
