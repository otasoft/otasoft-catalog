import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from '../../repositories/hotel.entity';
import { HotelRepository } from '../../repositories/hotel.repository';
import { GetSingleHotelQuery } from '../impl';

@QueryHandler(GetSingleHotelQuery)
export class GetSingleHotelHandler
  implements IQueryHandler<GetSingleHotelQuery> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
  ) {}

  async execute(query: GetSingleHotelQuery): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.findOne(
      query.hotelIdDto.id,
    );

    if (!hotel)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'hotel not found',
      });

    return hotel;
  }
}
