import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/app.interface';
import { Repository } from 'typeorm';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { GetAgendaQuery } from './dto/get-list-query';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from './entities/agenda.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda) private readonly agendaRepo: Repository<Agenda>,
  ) { }

  create(createAgendaDto: CreateAgendaDto) {
    return this.agendaRepo.create(createAgendaDto).save();
  }

  async findAll(query: GetAgendaQuery): Promise<Pagination<Agenda>> {
    const { page = 1, perPage = 10 } = query;
    const result = await this.agendaRepo.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return {
      page,
      perPage,
      data: result[0],
      total: result[1],
    }
  }

  findOne(id: string) {
    return this.agendaRepo.findOne({ where: { id } });
  }

  async update(id: string, updateAgendaDto: UpdateAgendaDto) {
    const foundAgenda = await this.agendaRepo.findOne({ where: { id } });
    if (!foundAgenda) {
      throw new NotFoundException('Can not find agenda with provided id');
    }

    for (let key in updateAgendaDto) {
      foundAgenda[key] = updateAgendaDto[key];
    }

    return foundAgenda.save();
  }

  remove(id: string) {
    return this.agendaRepo.remove({ id } as Agenda);
  }
}
