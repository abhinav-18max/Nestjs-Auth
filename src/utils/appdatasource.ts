import { DataSource } from 'typeorm';
import entities from './typeorm';

export const Appdatasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: '226939',
  username: 'postgres',
  database: 'opengrad',
  synchronize: true,
  logging: false,
  entities: entities,
});
