import { ApiProperty } from '@nestjs/swagger';

export class SpaceDto {
  @ApiProperty({ example: '12345678', required: true })
  id: string;

  @ApiProperty({ example: 'Space Name', required: true })
  name: string;

  @ApiProperty({ example: 'Space Address', required: true })
  address: string;
}
