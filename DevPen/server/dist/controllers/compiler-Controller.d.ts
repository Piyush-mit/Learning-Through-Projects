import { Response } from "express";
import { AuthRequest } from "../middlewares/verifyToken";
export interface fullCodeType {
    html: string;
    css: string;
    javascript: string;
}
export declare const saveOrUpdateCode: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loadCode: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMyCodes: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCode: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editCode: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllCodes: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=compiler-Controller.d.ts.map