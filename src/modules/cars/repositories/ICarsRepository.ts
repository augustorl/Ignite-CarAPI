import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  cars: Car[] = [];

  create(data: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };
