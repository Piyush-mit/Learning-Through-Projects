import { NextFunction, Request, Response } from "express";
export interface AuthRequest extends Request {
    _id?: string;
}
export declare const verifyTokenAnonymous: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=verifyTokenAnonymous.d.ts.map