import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    try {
      const newCar = await this.service.create(this.req.body);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const allCars = await this.service.findAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const car = await this.service.findById(this.req.params.id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const car = await this.service.update(this.req.params.id, this.req.body);
      return this.res.status(200).json(car);
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

export default CarController;