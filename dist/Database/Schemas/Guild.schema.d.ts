/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose from 'mongoose';
interface guild {
    guildId: string;
    ignorechannels: any;
    dj: {
        isEnabled: boolean;
        roleId: string;
    };
    _247: {
        voice_id: string;
        text_id: string;
        isEnabled: boolean;
    };
    isPremium: boolean;
    premium: {
        isActive: boolean;
        activatedBy: string;
        endDate: string;
    };
    isBlacklisted: boolean;
}
declare const _default: mongoose.Model<guild, {}, {}, {}, mongoose.Document<unknown, {}, guild> & guild & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<guild, mongoose.Model<guild, any, any, any, mongoose.Document<unknown, any, guild> & guild & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, guild, mongoose.Document<unknown, {}, mongoose.FlatRecord<guild>> & mongoose.FlatRecord<guild> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
