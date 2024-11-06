import mongoose from 'mongoose';
import config from '../../config.json' with { type: 'json' };
const Options = new mongoose.Schema({
    guildId: { type: String, required: true },
    prefix: { type: String, required: true, default: config.prefix }
});
export default mongoose.model('Prefix', Options);
//# sourceMappingURL=Prefix.schema.js.map