import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModule = {
  type: 'sqlite',
  database: 'db',
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: true,
};
