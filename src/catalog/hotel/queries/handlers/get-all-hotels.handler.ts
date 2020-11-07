import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { HotelEntity, HotelRepository } from '../../repositories';
import { GetAllHotelsQuery } from '../impl/get-all-hotels.query';

@QueryHandler(GetAllHotelsQuery)
export class GetAllHotelsHandler implements IQueryHandler<GetAllHotelsQuery> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all hotels will have some params like pagination, order, etc.
  async execute(query: GetAllHotelsQuery): Promise<HotelEntity[]> {
    const hotels: HotelEntity[] = await this.hotelRepository.find();

    if (!hotels.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Hotels not found',
      });

    return hotels;
  }
}
