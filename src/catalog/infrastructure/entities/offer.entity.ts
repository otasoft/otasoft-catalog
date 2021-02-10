import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class OfferEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  offer_id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
