import { IsInt, IsOptional, IsString } from 'class-validator';

export class UserListDto {
  @IsInt()
  page: number;

  @IsInt()
  limit: number;

  @IsString()
  @IsOptional()
  search?: string;
}
