import { NextFunction, Request, Response } from "express";
export interface AuthRequest extends Request {
    _id?: string;
}
export declare const verifyToken: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=verifyToken.d.ts.map