import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryIMemory: CategoriesRepositoryInMemory;

describe("Create a category", () => {
  beforeEach(() => {
    categoriesRepositoryIMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryIMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Test Category",
      description: "Category description",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const createdCategory = await categoriesRepositoryIMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("Should not be able to create two categories with the same name", async () => {
    expect(async () => {
      const category = {
        name: "Test Category",
        description: "Category description",
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
