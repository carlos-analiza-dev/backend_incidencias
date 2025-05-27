import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsString()
  buscador?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  sucursal?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
