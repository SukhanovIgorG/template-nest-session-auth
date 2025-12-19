import { ApiProperty } from '@nestjs/swagger';
import { SpaceDto } from './space.dto';

export class GetSpaceResponseDto {
  @ApiProperty({ type: SpaceDto })
  result: SpaceDto;
}
