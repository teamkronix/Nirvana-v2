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
interface user {
    userId: string;
    hasNoPrefix: boolean;
    premium: {
        premiumTier: 'silver' | 'gold' | 'platinum' | 'none';
        upgradedGuild: [];
        endDate: string;
    };
    isBlacklisted: boolean;
}
declare const _default: mongoose.Model<user, {}, {}, {}, mongoose.Document<unknown, {}, user> & user & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<user, mongoose.Model<user, any, any, any, mongoose.Document<unknown, any, user> & user & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, user, mongoose.Document<unknown, {}, mongoose.FlatRecord<user>> & mongoose.FlatRecord<user> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
