import mongoose from "mongoose";
interface IUserSchema {
    username: string;
    email: string;
    password: string;
    picture: string;
    savedCodes: Array<mongoose.Types.ObjectId>;
}
export declare const User: mongoose.Model<IUserSchema, {}, {}, {}, mongoose.Document<unknown, {}, IUserSchema, {}, mongoose.DefaultSchemaOptions> & IUserSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IUserSchema, mongoose.Model<IUserSchema, any, any, any, mongoose.Document<unknown, any, IUserSchema, any, {}> & IUserSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUserSchema, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUserSchema>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IUserSchema> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export {};
//# sourceMappingURL=User.d.ts.map