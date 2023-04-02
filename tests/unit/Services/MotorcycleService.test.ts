import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Test if MotorcycleService...', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Should create a motorcycle sucessfully', async function () {
    const inputMotorcycle: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,  
    };

    const outputMotorcycle: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'create').resolves(outputMotorcycle);

    const service = new MotorcycleService();
    const result = await service.create(inputMotorcycle);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Should find all motorcycles', async function () {
    const moto1: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 300',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 15.000,
      category: 'Street',
      engineCapacity: 300,
    });

    const moto2: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b3',
      model: 'Honda Cb 600f Hornet Xtreme',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 35.000,
      category: 'Street',
      engineCapacity: 600,
    });

    const outputMoto = [moto1, moto2];

    sinon.stub(Model, 'find').resolves(outputMoto);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(outputMoto);
  });

  it('Should find a motorcycle by id', async function () {
    const outputMoto: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b3',
      model: 'Honda Cb 600f Hornet Xtreme',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 35.000,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'findById').resolves(outputMoto);

    const service = new MotorcycleService();
    const result = await service.findById('6348513f34c397abcad040b3');

    expect(result).to.be.deep.equal(outputMoto);
  });

  it('Should update a motorcycle by id', async function () {
    const updateInput: Partial<IMotorcycle> = {
      model: 'Honda Bis',
      year: 2005,
    };

    const updateOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b3',
      model: 'Honda Bis',
      year: 2005,
      color: 'Blue',
      status: true,
      buyValue: 10.000,
      category: 'Street',
      engineCapacity: 120,
    });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutput);

    const service = new MotorcycleService();
    const result = await service.update('6348513f34c397abcad040b2', updateInput);

    expect(result).to.be.deep.equal(updateOutput);
  });

  it('Should delete a motorcycle by id', async function () {
    const updateOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b3',
      model: 'Honda Bis',
      year: 2005,
      color: 'Blue',
      status: true,
      buyValue: 10.000,
      category: 'Street',
      engineCapacity: 120,
    });

    sinon.stub(Model, 'findById').resolves(updateOutput);
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    const service = new MotorcycleService();
    const result = await service.deleteById('6348513f34c397abcad040b3');

    expect(result).to.be.equal(true);
  });
});