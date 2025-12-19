import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Space Name', required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Space Address', required: true })
  address: string;
}
