import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class ModuleHandler {
    client;
    constructor(client) {
        this.client = client;
        this.client.logger.debug("ModuleHandler", "Loading Modules");
    }
    loadModules() {
        const Modules = fs.readdirSync(path.join(__dirname, "../Modules"));
        Modules.forEach(async (module) => {
            try {
                const file = (await import(`../Modules/${module}/index.js`)).default;
                const mod = new file(this.client, module);
                await mod.load();
            }
            catch (e) {
                // this.client.logger.error(module, e);
                console.log(e);
            }
        });
    }
}
//# sourceMappingURL=Module.handler.js.map