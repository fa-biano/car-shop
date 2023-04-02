import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import AbstractExceptions from '../Errors/AbstractExceptions';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // console.log('err', err);
  const { status, message } = err as AbstractExceptions;
  res.status(status || 500).json({ message });
};

export default errorHandler;