import { Client } from 'discord.js';
import Logger from '../Services/Logger.service.js';
export default class BaseClient extends Client {
    logger = new Logger(this);
    constructor(options) {
        super(options);
    }
    async run(token) {
        this.logger.log('Client', 'Logging In');
        if (!token)
            throw new RangeError('NO TOKEN WAS PROVIDED.');
        await super.login(token)
            .then(x => {
            return x;
        })
            .catch(err => console.log(err));
    }
}
//# sourceMappingURL=BaseClient.structure.js.map