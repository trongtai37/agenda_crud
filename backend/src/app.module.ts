import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaModule } from './agenda/agenda.module';
import { typeOrmConfig } from './configs/database/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
  ConfigModule.forRoot({
    isGlobal: true,
  }), AgendaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
