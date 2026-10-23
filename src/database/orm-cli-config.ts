import  'dotenv/config';
import { DataSource } from "typeorm";
import { CreateCoursesTable1792688110946 } from "../migrations/1792688110946-CreateCoursesTable.js";
import { CreateTagsTable1792690187234 } from "../migrations/1792690187234-CreateTagsTable.js";
import { CreateCoursesTagsTable1792691965367 } from "../migrations/1792691965367-createCoursesTagsTable.js";
import { AddCoursesIdToCoursesTagsTable1792758483039 } from "../migrations/1792758483039-AddCoursesIdToCoursesTagsTable.js";
import { AddTagsIdToCoursesTagsTable1792759668667 } from "../migrations/1792759668667-AddTagsIdToCoursesTagsTable.js";
import { Course } from "../courses/entities/courses.entity.js";
import { Tag } from "../courses/entities/tags.entity.js";
import { DataSourceOptions } from "typeorm/browser";

export const dataSoureceOptions: DataSourceOptions ={
    type:'postgres', //tipo do banco
    host: process.env.DB_HOST, // conexão do host
    port: Number(process.env.DB_PORT), // porta declarada no nosso dockerfile
    username: process.env.DB_USER, // usuario no bd
    password: process.env.DB_PASS, // senha do bd
    database: process.env.DB_NAME, // nome do bd
    entities: [Course, Tag], // as entidades do bd
    synchronize: false, // faz a sincronização das nossas entidades para efetuar a criação automatica das entidadews
}

export const dataSource = new DataSource({
    ...dataSoureceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1792688110946,CreateTagsTable1792690187234,CreateCoursesTagsTable1792691965367,AddCoursesIdToCoursesTagsTable1792758483039,AddTagsIdToCoursesTagsTable1792759668667],
})