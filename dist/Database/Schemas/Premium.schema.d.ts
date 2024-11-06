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
interface prefix {
    guildId: string;
    tire: string;
    startTime: string;
    endTime: string;
}
declare const _default: mongoose.Model<prefix, {}, {}, {}, mongoose.Document<unknown, {}, prefix> & prefix & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<prefix, mongoose.Model<prefix, any, any, any, mongoose.Document<unknown, any, prefix> & prefix & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, prefix, mongoose.Document<unknown, {}, mongoose.FlatRecord<prefix>> & mongoose.FlatRecord<prefix> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
