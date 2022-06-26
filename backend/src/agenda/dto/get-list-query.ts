import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetAgendaQuery {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  perPage?: number;
}
