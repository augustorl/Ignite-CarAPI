import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test car description",
      daily_rate: 13.0,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "test_brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test car description",
      daily_rate: 13.0,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "car_test_brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "car_test_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Test car description",
      daily_rate: 13.0,
      license_plate: "ABC-1412",
      fine_amount: 100,
      brand: "car_test_brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Test car description",
      daily_rate: 13.0,
      license_plate: "ABC-1412",
      fine_amount: 100,
      brand: "car_test_brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "car3",
    });

    expect(cars).toEqual([car]);
  });
});
