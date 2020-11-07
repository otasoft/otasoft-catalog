import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { ActivityEntity } from './activity.entity';

@EventSubscriber()
export class ActivitySubscriber
  implements EntitySubscriberInterface<ActivityEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ActivityEntity;
  }

  beforeInsert(event: InsertEvent<ActivityEntity>) {
    console.log('BEFORE ACTIVITY INSERTED:', event.entity);
  }

  beforeUpdate(event: InsertEvent<ActivityEntity>) {
    console.log('BEFORE ACTIVITY UPDATED:', event.entity);
  }

  beforeRemove() {
    console.log('BEFORE ACTIVITY DELETED');
  }
}
