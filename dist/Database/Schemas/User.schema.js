import mongoose from 'mongoose';
const Options = new mongoose.Schema({
    userId: { type: String, required: true },
    hasNoPrefix: { type: Boolean, default: false },
    premium: {
        premiumTier: { type: String, default: "none" },
        upgradedGuild: { type: Array, default: [] },
        endDate: { type: String, default: "" }
    },
    isBlacklisted: { type: Boolean, default: false }
});
export default mongoose.model('User', Options);
//# sourceMappingURL=User.schema.js.map