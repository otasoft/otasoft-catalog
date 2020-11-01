import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  
  @Entity()
  @Unique(['name'])
  export class FlightEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    flight_id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  }
  