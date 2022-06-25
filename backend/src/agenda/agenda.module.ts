import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './entities/agenda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda])],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule { }
