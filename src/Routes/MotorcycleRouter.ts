import { Router } from 'express';
import MotorcyleController from '../Controllers/MotorcyleController';

const motorcycleRouter = Router();

motorcycleRouter.post(
  '/',
  (req, res, next) => new MotorcyleController(req, res, next).create(),
);

motorcycleRouter.get(
  '/',
  (req, res, next) => new MotorcyleController(req, res, next).findAll(),
);

motorcycleRouter.get(
  '/:id',
  (req, res, next) => new MotorcyleController(req, res, next).findById(),
);

motorcycleRouter.put(
  '/:id',
  (req, res, next) => new MotorcyleController(req, res, next).update(),
);

motorcycleRouter.delete(
  '/:id',
  (req, res, next) => new MotorcyleController(req, res, next).deleteById(),
);

export default motorcycleRouter;