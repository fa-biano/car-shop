import { isValidObjectId, model, Model, models, Schema } from 'mongoose';
import Unprocessable from '../Errors/Unprocessable';

const INVALID_MONGO_ID = 'Invalid mongo id';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Unprocessable(INVALID_MONGO_ID);
    return this.model.findById(id);
  }

  public async findAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Unprocessable(INVALID_MONGO_ID);
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj },
      { new: true },
    );
  }

  public async deleteById(id: string) {
    if (!isValidObjectId(id)) throw new Unprocessable(INVALID_MONGO_ID);
    return this.model.findByIdAndDelete(id, { rawResult: true });
  }
}

export default AbstractODM;