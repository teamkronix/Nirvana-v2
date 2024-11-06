import mongoose from 'mongoose';
const Options = new mongoose.Schema({
    guildId: { type: String, required: true },
    ignorechannels: { type: Array, default: [] },
    dj: {
        isEnabled: { type: Boolean, default: false },
        roleId: { type: String, default: "" }
    },
    _247: {
        voice_id: { type: String, default: "" },
        text_id: { type: String, default: "" },
        isEnabled: { type: Boolean, default: false }
    },
    premium: {
        isActive: { type: Boolean, default: false },
        activatedBy: { type: String, default: "" },
        endDate: { type: String, default: "" }
    },
    isBlacklisted: { type: Boolean, default: false }
});
export default mongoose.model('Guild', Options);
//# sourceMappingURL=Guild.schema.js.map