import { Player } from "shoukaku";
import { Bot } from "../../../Clients/Bot.client.js";
import Dispatcher, { Song } from "../../../Modules/Music/Dispatcher.music.js";
import Event from "../../../Structures/Event.structure.js";
export default class TrackStart extends Event {
    constructor(client: Bot, file: string);
    run(_player: Player, track: Song, dispatcher: Dispatcher): Promise<void>;
}
