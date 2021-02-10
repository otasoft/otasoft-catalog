import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { OfferEntity } from '../../catalog/infrastructure/entities';

@EventSubscriber()
export class OfferSubscriber
  implements EntitySubscriberInterface<OfferEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return OfferEntity;
  }

  beforeInsert(event: InsertEvent<OfferEntity>) {
    console.log('BEFORE OFFER INSERTED:', event.entity);
  }

  beforeUpdate(event: UpdateEvent<OfferEntity>) {
    console.log('BEFORE OFFER UPDATED:', event.entity);
  }

  beforeRemove() {
    console.log('BEFORE OFFER DELETED');
  }
}
