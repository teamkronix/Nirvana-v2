/* eslint-disable */
import { Connectors, Shoukaku } from "shoukaku";
export class ShoukakuClient extends Shoukaku {
    client;
    constructor(client, lavanodes) {
        super(new Connectors.DiscordJS(client), lavanodes, {
            resume: true,
            resumeTimeout: 30,
            resumeByLibrary: true,
            reconnectTries: 5,
            reconnectInterval: 5,
            restTimeout: 60,
            moveOnDisconnect: false,
            userAgent: `Nirvana Bot`,
            nodeResolver: (nodes) => [...nodes.values()]
                .filter((node) => node.state === 2)
                .sort((a, b) => a.penalties - b.penalties)
                .shift(),
        });
        this.client = client;
        this.on("ready", (name, reconnected) => {
            this.client.shoukaku.emit(reconnected ? "nodeReconnect" : "nodeConnect", name);
        });
        this.on("error", (name, error) => {
            this.client.shoukaku.emit("nodeError", name, error);
        });
        this.on("close", (name, code, reason) => {
            this.client.shoukaku.emit("nodeDestroy", name, code, reason);
        });
        this.on("disconnect", (name, count) => {
            this.client.shoukaku.emit("nodeDisconnect", name, count);
        });
        this.on("debug", (name, reason) => {
            this.client.shoukaku.emit("nodeRaw", name, reason);
        });
    }
}
//# sourceMappingURL=Shoukaku.music.js.map