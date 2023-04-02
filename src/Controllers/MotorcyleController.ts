import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcyleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    try {
      const newMotorcycle = await this.service.create(this.req.body);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const allMotos = await this.service.findAll();
      return this.res.status(200).json(allMotos);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const moto = await this.service.findById(this.req.params.id);
      return this.res.status(200).json(moto);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const moto = await this.service.update(this.req.params.id, this.req.body);
      return this.res.status(200).json(moto);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById() {
    try {
      await this.service.deleteById(this.req.params.id);
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcyleController;