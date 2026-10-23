import { randomBytes, randomUUID } from 'crypto';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectedOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository:any;

  beforeEach(async () => {
   service = new CoursesService()
   id = randomUUID()
   created_at= new Date()

   expectedOutputTags =[
    {
    id,
    name:'nestjs',
    created_at,
   },
  ]
  
  expectOutputCourses =
    {
      id,
      name:'test',
      description: 'test description',
      created_at,
      tags: expectedOutputTags,
    },

    mockCourseRepository ={
      create: vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload:vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findall:vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: vitest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    }

    mockTagRepository ={
      create: vitest.fn().mockReturnValue(Promise.resolve(expectedOutputTags)),
      findOne:vitest.fn(),

    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


    it('should create a course', async () => {
      //@ts-expect-error define part of methods
      service['coursesRepository'] = mockCourseRepository
      //@ts-expect-error define part of methods
      service['tagsRepository'] = mockTagRepository

      const createCourseDto : CreateCourseDto ={
        name:'test',
        description: 'test description',
        tags:['nestjs']
      }
      const newCourse = await service.create(createCourseDto)

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse)
  });


    it('should list all courses', async () => {
      //@ts-expect-error define part of methods
      service['coursesRepository'] = mockCourseRepository

   
      const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses)
  });


   it('should gets a   course for id', async () => {
      //@ts-expect-error define part of methods
      service['coursesRepository'] = mockCourseRepository

   
      const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  });


  it('should upadete a course by id', async () => {
      //@ts-expect-error define part of methods
      service['coursesRepository'] = mockCourseRepository
      //@ts-expect-error define part of methods
      service['tagsRepository'] = mockTagRepository

      const updateCourseDto : UpdateCourseDto ={
        name:'test',
        description: 'test description',
        tags:['nestjs']
      }
      const course = await service.update(id,updateCourseDto)

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  });

  
   it('should removes a   course for id', async () => {
      //@ts-expect-error define part of methods
      service['coursesRepository'] = mockCourseRepository

   
      const course = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  });

});

