import { CreateCarsHandler } from "./create-cars.handler";
import { DeleteCarsHandler } from "./delete-cars.handler";
import { UpdateCarsHandler } from "./update-cars.handler";

export const CommandHandlers = [
    CreateCarsHandler,
    DeleteCarsHandler,
    UpdateCarsHandler
];
