import * as dotenv from "dotenv";
import { join, resolve } from "path";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { UserEntity } from "./models/User.entity.js";

dotenv.config(); 

export const ORM_CONFIG: PostgresConnectionOptions = {
    name: process.env.DB_CONN,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: Boolean(process.env.DB_SYNC === "true"),
    entities: [ 
        UserEntity,
    ],
}

console.log(resolve(join(__dirname, '/**/*.entity.js')));

export const AppDataSource = new DataSource(ORM_CONFIG);