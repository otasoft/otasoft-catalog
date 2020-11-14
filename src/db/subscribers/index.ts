import { ActivitySubscriber } from "./activity.subscriber";
import { CarsSubscriber } from "./cars.subscriber";
import { FlightSubscriber } from "./flight.subscriber";

export const CatalogSubscribers = [
    ActivitySubscriber,
    CarsSubscriber,
    FlightSubscriber
]