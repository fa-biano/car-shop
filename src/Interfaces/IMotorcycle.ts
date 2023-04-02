import MotorcycleCategory from '../utils/MotorcycleCategory';
import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle {
  category: keyof typeof MotorcycleCategory; 
  engineCapacity: number;
}

export default IMotorcycle;