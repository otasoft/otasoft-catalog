import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { HotelEntity, HotelRepository } from '../../repositories';
import { GetSingleHotelQuery } from '../impl';

@QueryHandler(GetSingleHotelQuery)
export class GetSingleHotelHandler
  implements IQueryHandler<GetSingleHotelQuery> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(query: GetSingleHotelQuery): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.findOne(query.id);

    if (!hotel)
      this.rpcExceptionService.throwNotFound(
        `Hotel with ID ${query.id} not found`,
      );

    return hotel;
  }
}
