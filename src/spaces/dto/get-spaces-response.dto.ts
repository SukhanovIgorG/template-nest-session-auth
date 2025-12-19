import { ApiProperty } from '@nestjs/swagger';
import { SpaceDto } from './space.dto';
import { PaginationDto } from '@/shared/dto/pagination.dto';

export class GetSpacesResponseDto {
  @ApiProperty({ type: [SpaceDto] })
  result: SpaceDto[];

  @ApiProperty({
    type: PaginationDto,
  })
  pagination: PaginationDto;
}
