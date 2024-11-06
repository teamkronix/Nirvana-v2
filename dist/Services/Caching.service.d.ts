import { Redis } from "ioredis";
import { Bot } from "../Clients/Bot.client";
export default class Caching extends Redis {
    private botclient;
    constructor(client: Bot);
    setValue(key: string, value: string, expiry?: number): Promise<boolean>;
    delValue(key: string): Promise<boolean>;
    getValue(key: string): Promise<string | null>;
    updateValue(key: string, value: string): Promise<boolean>;
    checkValue(key: string): Promise<boolean>;
}
