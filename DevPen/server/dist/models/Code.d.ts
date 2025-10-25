import mongoose from "mongoose";
interface ICodeSchema {
    fullCode: {
        html: string;
        css: string;
        javascript: string;
    };
    title: string;
    ownerInfo: mongoose.Types.ObjectId | string;
    ownerName: string;
}
export declare const Code: mongoose.Model<ICodeSchema, {}, {}, {}, mongoose.Document<unknown, {}, ICodeSchema, {}, mongoose.DefaultSchemaOptions> & ICodeSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<ICodeSchema, mongoose.Model<ICodeSchema, any, any, any, mongoose.Document<unknown, any, ICodeSchema, any, {}> & ICodeSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICodeSchema, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICodeSchema>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<ICodeSchema> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export {};
//# sourceMappingURL=Code.d.ts.map