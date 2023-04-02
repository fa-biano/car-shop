import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleCategory from '../utils/MotorcycleCategory';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: keyof typeof MotorcycleCategory; 
  private engineCapacity: number;

  constructor({
    id,
    model,
    year,
    color,
    status = false,
    buyValue,
    category,
    engineCapacity }: IMotorcycle) {
    super({ id, model, year, color, status, buyValue });
    this.category = MotorcycleCategory[category];
    this.engineCapacity = engineCapacity;
  }
}

export default Motorcycle;