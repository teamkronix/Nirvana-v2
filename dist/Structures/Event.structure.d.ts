import { Bot } from '../Clients/Bot.client.js';
interface EventOptions {
    name: string;
    once?: boolean;
}
export default class Event {
    client: Bot;
    once: boolean;
    file: string;
    name: string;
    fileName: string;
    constructor(client: Bot, file: string, options: EventOptions);
    run(..._args: any[]): Promise<any>;
}
export {};
