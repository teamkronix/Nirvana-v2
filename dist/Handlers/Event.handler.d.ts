import { Bot } from "../Clients/Bot.client";
export declare class EventListener {
    client: Bot;
    constructor(client: Bot);
    loadEvents(): void;
}
