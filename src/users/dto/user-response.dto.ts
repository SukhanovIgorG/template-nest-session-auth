import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: [String] })
  roles: string[];
}

export class UsersListResponseDto {
  @ApiProperty({ type: [UserDto] })
  result: UserDto[];

  @ApiProperty()
  pagination: {
    total: number;
    page: number;
  };
}
