import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class EventListener {
    client;
    constructor(client) {
        this.client = client;
        client.logger.debug("Client Events", "Loading events");
    }
    loadEvents() {
        const eventsPath = fs.readdirSync(path.join(__dirname, "../Listeners/Events"));
        eventsPath.forEach((dir) => {
            const events = fs
                .readdirSync(path.join(__dirname, `../Listeners/Events/${dir}`))
                .filter((file) => file.endsWith(".js"));
            events.forEach(async (file) => {
                const event = (await import(`../Listeners/Events/${dir}/${file}`))
                    .default;
                const evt = new event(this.client, file);
                switch (dir) {
                    case "Music":
                        this.client.shoukaku.on(evt.name, (...args) => evt.run(...args));
                        break;
                    default:
                        this.client.on(evt.name, (...args) => evt.run(this.client, ...args));
                        break;
                }
            });
        });
    }
}
//# sourceMappingURL=Event.handler.js.map