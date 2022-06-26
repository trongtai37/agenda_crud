import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { GetAgendaQuery } from './dto/get-list-query';
import { UpdateAgendaDto } from './dto/update-agenda.dto';

@ApiTags('Agenda')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) { }

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto);
  }

  @Get('export')
  async exportAll(@Response({ passthrough: true }) res) {
    const filePath = await this.agendaService.exportAll();
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="agendas_${Date.now()}.csv"`,
    });

    return new StreamableFile(createReadStream(filePath));
  }

  @Get()
  findAll(@Query() query: GetAgendaQuery) {
    return this.agendaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendaDto: UpdateAgendaDto) {
    return this.agendaService.update(id, updateAgendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaService.remove(id);
  }
}
