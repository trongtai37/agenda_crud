import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AgendaStatus } from '../entities/agenda.entity';

export class CreateAgendaDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Agenda Title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Agenda Description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    example: new Date().toISOString(),
  })
  @IsString()
  @IsOptional()
  startTime: string;

  @ApiProperty({
    type: String,
    required: true,
    example: new Date().toISOString(),

  })
  @IsString()
  @IsOptional()
  endTime: string;

  @ApiProperty({
    enum: AgendaStatus,
    required: true,
    example: AgendaStatus.IN_COMING,
    enumName: 'AgendaStatus',
  })
  @IsEnum(AgendaStatus, { each: true })
  @IsOptional()
  status: AgendaStatus;
}
