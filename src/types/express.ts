import {
  Express as ex,
  Request as req,
  Response as res,
  NextFunction as next,
} from "express";

interface Express extends ex {}

interface Request extends req {}

interface Response extends res {}

interface NextFunction extends next {}

export { Express, Request, Response, NextFunction };
