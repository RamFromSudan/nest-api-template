// eslint-disable-next-line @typescript-eslint/no-var-requires
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  // Enable if using SSL connections
  // ssl: { rejectUnauthorized: false },
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
  // Set to true to auto-synchronise DB schema with models
  synchronize: true,
};
