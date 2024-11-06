import { Client, ClientOptions } from 'discord.js';
import Logger from '../Services/Logger.service.js';
export default class BaseClient extends Client {
    logger: Logger;
    constructor(options: ClientOptions);
    run(token: string): Promise<void>;
}
