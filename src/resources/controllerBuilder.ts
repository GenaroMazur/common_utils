import { NextFunction, Request, Response } from "express";
import { endpointResponse } from "./success";

export const controllerBuilder =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<unknown> | unknown
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let nextActioned = false;
      const result = await fn(req, res, (err?: unknown) => {
        nextActioned = true;
        next(err);
      });

      if (nextActioned) return;
      if (res.headersSent) return;
      endpointResponse({
        res,
        message: req.statusMessage || "OK",
        code: req.statusCode,
        body: result,
      });
    } catch (error) {
      next(error);
    }
  };
