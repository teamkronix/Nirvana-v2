import mongoose from 'mongoose';
const Options = new mongoose.Schema({
    guildId: { type: String, required: true },
    tire: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});
export default mongoose.model('Premium', Options);
//# sourceMappingURL=Premium.schema.js.map