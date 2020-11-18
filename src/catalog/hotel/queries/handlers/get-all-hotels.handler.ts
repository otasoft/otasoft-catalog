import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { HotelRepository } from '../../repositories';
import { GetAllHotelsQuery } from '../impl/get-all-hotels.query';
import { HotelEntity } from '../../../../db/entities/hotel.entity';

@QueryHandler(GetAllHotelsQuery)
export class GetAllHotelsHandler implements IQueryHandler<GetAllHotelsQuery> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  // Currently query is not used, but in the future, requesting all hotels will have some params like pagination, order, etc.
  async execute(query: GetAllHotelsQuery): Promise<HotelEntity[]> {
    const hotels: HotelEntity[] = await this.hotelRepository.find();

    if (!hotels.length)
      this.rpcExceptionService.throwNotFound('Hotels not found');

    return hotels;
  }
}
