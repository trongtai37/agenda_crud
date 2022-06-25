import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {}
