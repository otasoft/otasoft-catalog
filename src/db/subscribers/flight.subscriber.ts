import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { FlightEntity } from '../entities/flight.entity';

@EventSubscriber()
export class FlightSubscriber
  implements EntitySubscriberInterface<FlightEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return FlightEntity;
  }

  beforeInsert(event: InsertEvent<FlightEntity>) {
    console.log('BEFORE FLIGHT INSERTED:', event.entity);
  }

  beforeUpdate(event: UpdateEvent<FlightEntity>) {
    console.log('BEFORE FLIGHT UPDATED:', event.entity);
  }

  beforeRemove() {
    console.log('BEFORE FLIGHT DELETED');
  }
}
