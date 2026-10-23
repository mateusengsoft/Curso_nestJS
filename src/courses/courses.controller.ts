import { Controller,Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService){}


    @Get()
    findall(){
        return this.courseService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.courseService.findOne(id)
    }

 
    @Post()
    create(@Body() createCourseDto: CreateCourseDto){
        return this.courseService.create(createCourseDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDto:UpdateCourseDto){
      
        return this.courseService.update(id, updateCourseDto)

    }
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.courseService.remove(id)
    }

}
