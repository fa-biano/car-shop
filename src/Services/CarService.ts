import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import NotFound from '../Errors/NotFound';

const CAR_NOT_FOUND = 'Car not found';

class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) return new Car(car);
    return null;
  }

  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findById(carId: string) {
    const car = await this.carODM.findById(carId);
    if (!car) throw new NotFound(CAR_NOT_FOUND);
    return this.createCarDomain(car);
  }

  public async findAll() {
    const allCars = await this.carODM.findAll();
    const allCarsSet = allCars.map((car) => this.createCarDomain(car));
    return allCarsSet;
  }

  public async update(id: string, updateCar: Partial<ICar>) {
    const update = await this.carODM.update(id, updateCar);
    if (!update) throw new NotFound(CAR_NOT_FOUND);
    return this.createCarDomain(update);
  }

  public async deleteById(id: string) {
    const car = await this.carODM.findById(id);
    if (!car) throw new NotFound(CAR_NOT_FOUND);
    await this.carODM.deleteById(id);    
    return true;
  }
}

export default CarService;