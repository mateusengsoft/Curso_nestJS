import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Course } from './entities/courses.entity.js';
import { DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity.js';
import { CoursesModule } from './courses.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import request from 'supertest';


describe('CoursesController e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];
  
 const dataSoureceTest: DataSourceOptions ={
      type:'postgres', //tipo do banco
      host: process.env.DB_HOST, // conexão do host
      port: 5433, // porta declarada no nosso dockerfile
      username: process.env.DB_USER, // usuario no bd
      password: process.env.DB_PASS, // senha do bd
      database: process.env.DB_NAME, // nome do bd
      entities: [Course, Tag], // as entidades do bd
      synchronize: true, // faz a sincronização das nossas entidades para efetuar a criação automatica das entidadews
  }
  

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports:[
       CoursesModule, 
       TypeOrmModule.forRootAsync({
            useFactory: async () =>{
              return dataSoureceTest
          },
       }),
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
    console.log('Aplicação de teste inicializada');

    data = {
      name:'Node.js',
      description:'Node.js',
      tags: ['nodejs', 'nestjs']
    }

  });

  beforeEach(async() => {
  const dataSource = await new DataSource(dataSoureceTest).initialize()  
  const repository = dataSource.getRepository(Course)
  courses = await repository.find()
  await dataSource.destroy()

  })



  describe('POST /courses', () => {
  it('should create a course', async () => {
    const routesCheck = await request(app.getHttpServer())
      .get('/courses');

    console.log('GET /courses:', routesCheck.status);
    console.log('Resposta GET:', routesCheck.body);

    const res = await request(app.getHttpServer())
      .post('/courses')
      .send(data);

    console.log('POST /courses:', res.status);
    console.log('Resposta POST:', res.body);

    expect(res.status).toBe(201);
  });
});
 
});
