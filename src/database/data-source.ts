// import { DataSource } from 'typeorm';
// import { join } from 'node:path';

// export default new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: 5432,
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   entities: [join(import.meta.dirname, '**', '*.entity.js')],
//   migrations: [join(import.meta.dirname, 'migrations', '*.js')],
// });

import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'node:path';

export const getDataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(import.meta.dirname, '..', '**', '*.entity.js')],
  migrations: [join(import.meta.dirname, 'migrations', '*.js')],
});

export default new DataSource(getDataSourceOptions());
