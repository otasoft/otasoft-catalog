import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { CarsEntity } from './cars.entity';

@EventSubscriber()
export class CarsSubscriber implements EntitySubscriberInterface<CarsEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CarsEntity;
  }

  beforeInsert(event: InsertEvent<CarsEntity>) {
    console.log('BEFORE CAR INSERTED:', event.entity);
  }

  beforeUpdate(event: InsertEvent<CarsEntity>) {
    console.log('BEFORE CAR UPDATED:', event.entity);
  }

  beforeRemove() {
    console.log('BEFORE CAR DELETED');
  }
}
