import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
import { Course } from './entities/courses.entity.js';
import { DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity.js';
import { CoursesModule } from './courses.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { CoursesResponse } from './interfaces/CoursesResponse.js';


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

  afterAll(async() =>{
    await module.close();

  })

  //pnpm run test:e2e -- courses.controller "comando para rodar os testes."

  describe('POST /courses', () => {
  it('should create a course', async () => {
   const res = await request(app.getHttpServer())
      .post('/courses')
      .send(data);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
      expect(res.body.created_at).toBeDefined();
      expect(res.body.tags[0].name).toEqual(data.tags[0])
      expect(res.body.tags[1].name).toEqual(data.tags[1])
      console.log(res.body);

  });
});

  describe('Get /courses', () => {
  it('should list all courses', async () => {
   const res = await request(app.getHttpServer())
      .get('/courses')
      expect(res.status).toBe(200);
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].description).toEqual(data.description);
      expect(res.body[0].created_at).toBeDefined();
      res.body.map((item:CoursesResponse) => expect(item).toEqual({
        id: item.id,  
        name: item.name,
        description: item.description,
        created_at: item.created_at,
        tags: [... item.tags],
      }))
      console.log("Passou por aqui")
  });
});

  describe('Get /courses/id', () => {
  it('should gets a course by id', async () => {
   const res = await request(app.getHttpServer())
      .get(`/courses/${courses[0].id}`)
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(courses[0].id)
      expect(res.body.name).toEqual(courses[0].name);
      expect(res.body.description).toEqual(courses[0].description);
    console.log(res.body)
  });
});

  describe('PUT /courses/id', () => {
  it('should update a course by id', async () => {
     const updateData = {
      name:'newName.js',
      description:'New description',
      tags: ['one', 'two']
    }
   const res = await request(app.getHttpServer())
      .put(`/courses/${courses[0].id}`)
      .send(updateData)
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(courses[0].id)
      expect(res.body.name).toEqual('newName.js');
      expect(res.body.description).toEqual('New description');
      expect(res.body.tags[0].name).toEqual('one');
      expect(res.body.tags[1].name).toEqual('two');
    console.log(res.body)
  });
});

  describe('DELETE /courses/id', () => {
  it('should delete a course by id', async () => {
   const res = await request(app.getHttpServer())
      .delete(`/courses/${courses[0].id}`)
      expect(res.status).toBe(204);
      expect(res.body).toEqual({})
      console.log("Foi deletado!")
  });
});
 
 
});
