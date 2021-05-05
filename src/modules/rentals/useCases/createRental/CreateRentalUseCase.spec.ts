import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayWith24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test car",
      description: "test Car",
      daily_rate: 120,
      license_plate: "test",
      fine_amount: 10,
      category_id: "1234",
      brand: "test brand",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayWith24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  // it("should not be able to create a new rental if there is already one for the same user", async () => {
  //   await rentalsRepositoryInMemory.create({
  //     car_id: "1111",
  //     expected_return_date: dayWith24Hours,
  //     user_id: "123",
  //   });

  //   await expect(
  //     createRentalUseCase.execute({
  //       user_id: "123",
  //       car_id: "121212",
  //       expected_return_date: dayWith24Hours,
  //     })
  //   ).rejects.toEqual(
  //     new AppError("There is a already a rental in progress for this user")
  //   );
  // });
  it("should not be able to create a new rental if there is already one for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "test",
      expected_return_date: dayWith24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayWith24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavaible at this time!"));
  });
  it("should not be able to create a new rental with an invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
