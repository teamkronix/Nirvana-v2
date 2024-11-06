import type { Player } from "shoukaku";
import { Bot } from "../../../Clients/Bot.client";
import Dispatcher, { Song } from "../../../Modules/Music/Dispatcher.music";
import Event from "../../../Structures/Event.structure.js";
export default class QueueEnd extends Event {
    constructor(client: Bot, file: string);
    run(_player: Player, track: Song, dispatcher: Dispatcher): Promise<void>;
}
