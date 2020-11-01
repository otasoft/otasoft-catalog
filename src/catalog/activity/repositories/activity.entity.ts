import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class ActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
