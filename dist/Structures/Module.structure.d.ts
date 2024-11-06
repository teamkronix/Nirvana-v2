import { Bot } from '../Clients/Bot.client.js';
interface moduleOptions {
    name: string;
    required?: boolean;
}
export default class Module {
    client: Bot;
    nessary: boolean;
    file: string;
    name: string;
    required: boolean;
    constructor(client: Bot, file: string, options: moduleOptions);
    load(..._args: any[]): Promise<any>;
    unload(..._args: any[]): Promise<any>;
}
export {};
