import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  
  @Entity()
  @Unique(['name'])
  export class CarsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    cars_id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  }
  