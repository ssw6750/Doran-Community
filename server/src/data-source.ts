// import "reflect-metadata"
// import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   port: 5432,
//   host: process.env.POSTGRES_HOST,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   synchronize: true,
//   logging: false,
//   entities: ["src/entities/**/*.ts"],
//   migrations: [],
//   subscribers: [],
// });

import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: [],
  subscribers: [],
});