import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller.js';
import { CoursesService } from './courses.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity.js';
import { Tag } from './entities/tags.entity.js';

@Module({
    imports:[TypeOrmModule.forFeature([Course, Tag])], // o forfeature é um metodo que permite  que manipulemos  o repositorio course dentro do nosso modulo courses 
    controllers:[CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
