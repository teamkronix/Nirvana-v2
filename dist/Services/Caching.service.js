import { Redis } from "ioredis";
export default class Caching extends Redis {
    botclient;
    constructor(client) {
        super({
            host: client.config.redis.host ? client.config.redis.host : "localhost",
            port: client.config.redis.port ? client.config.redis.port : 6379,
            db: client.config.redis.db ? client.config.redis.db : 0,
        });
        this.botclient = client;
    }
    async setValue(key, value, expiry) {
        try {
            if (expiry) {
                await this.set(key, value, "EX", expiry);
            }
            else {
                await this.set(key, value);
            }
            return true;
        }
        catch (error) {
            this.botclient.logger.warn("Caching", `Error setting the value : ${error}`);
            return false;
        }
    }
    async delValue(key) {
        if (this.exists(key)) {
            await this.del(key);
            return true;
        }
        else {
            return false;
        }
    }
    async getValue(key) {
        try {
            const value = await this.get(key);
            if (value != null) {
                return value;
            }
            else {
                this.botclient.logger.warn("Caching", `${key} not found.`);
                return null;
            }
        }
        catch (error) {
            return null;
        }
    }
    async updateValue(key, value) {
        try {
            return await this.setValue(key, value);
        }
        catch (error) {
            this.botclient.logger.warn("Caching", `Unexpected error occured : ${error}`);
            return false;
        }
    }
    async checkValue(key) {
        try {
            const exists = await this.exists(key);
            if (exists) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            this.botclient.logger.warn("Caching", `Unexpected error occured : ${error}`);
            return false;
        }
    }
}
//# sourceMappingURL=Caching.service.js.map