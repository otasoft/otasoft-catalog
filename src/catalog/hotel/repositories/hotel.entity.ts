import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  
  @Entity()
  @Unique(['name'])
  export class HotelEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    hotel_id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  }
  