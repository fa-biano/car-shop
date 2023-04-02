import Motorcycle from '../Domains/Motorcycle';
import NotFound from '../Errors/NotFound';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor() {
    this.motorcycleODM = new MotorcycleODM();
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) return new Motorcycle(motorcycle);
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);    
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const allMotos = await this.motorcycleODM.findAll();
    const allMotosSet = allMotos.map((moto) => this.createMotorcycleDomain(moto));
    return allMotosSet;
  }

  public async findById(id: string) {
    const moto = await this.motorcycleODM.findById(id);
    if (!moto) throw new NotFound(MOTORCYCLE_NOT_FOUND);
    return this.createMotorcycleDomain(moto);
  }

  public async update(id: string, updateMoto: Partial<IMotorcycle>) {
    const update = await this.motorcycleODM.update(id, updateMoto);
    if (!update) throw new NotFound(MOTORCYCLE_NOT_FOUND);
    return this.createMotorcycleDomain(update);
  }

  public async deleteById(id: string) {
    const moto = await this.motorcycleODM.findById(id);
    if (!moto) throw new NotFound(MOTORCYCLE_NOT_FOUND);
    await this.motorcycleODM.deleteById(id);    
    return true;
  }
}

export default MotorcycleService;