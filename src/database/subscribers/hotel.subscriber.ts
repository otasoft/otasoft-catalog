import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { HotelEntity } from '../entities/hotel.entity';

@EventSubscriber()
export class HotelSubscriber implements EntitySubscriberInterface<HotelEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return HotelEntity;
  }

  beforeInsert(event: InsertEvent<HotelEntity>) {
    console.log('BEFORE HOTEL INSERTED:', event.entity);
  }

  beforeUpdate(event: UpdateEvent<HotelEntity>) {
    console.log('BEFORE HOTEL UPDATED:', event.entity);
  }

  beforeRemove() {
    console.log('BEFORE HOTEL DELETED');
  }
}
