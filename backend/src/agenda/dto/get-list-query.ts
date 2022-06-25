import { IsNumber, IsOptional } from "class-validator";

export class GetAgendaQuery {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}
