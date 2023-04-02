import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('Test if CarService...', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Should create a car sucessfully', async function () {
    const inputCar: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const outputCar: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarService();
    const result = await service.create(inputCar);

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Should find all cars', async function () {
    const car1: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    const car2: Car = new Car({
      id: '6348513f34c397abcad040b3',
      model: 'Tempra',
      year: 1999,
      color: 'Black',
      status: true,
      buyValue: 13.990,
      doorsQty: 2,
      seatsQty: 5,
    });

    const outputCar = [car1, car2];

    sinon.stub(Model, 'find').resolves(outputCar);

    const service = new CarService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Should find a car by id', async function () {
    const outputCar: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findById').resolves(outputCar);

    const service = new CarService();
    const result = await service.findById('6348513f34c397abcad040b2');

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Should update a car by id', async function () {
    const updateInput: Partial<ICar> = {
      model: 'Fiorino',
      year: 1997,
    };

    const updateOutput: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Fiorino',
      year: 1997,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutput);

    const service = new CarService();
    const result = await service.update('6348513f34c397abcad040b2', updateInput);

    expect(result).to.be.deep.equal(updateOutput);
  });

  it('Should delete a car by id', async function () {
    const updateOutput: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Fiorino',
      year: 1997,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findById').resolves(updateOutput);
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    const service = new CarService();
    const result = await service.deleteById('6348513f34c397abcad040b2');

    expect(result).to.be.equal(true);
  });
});