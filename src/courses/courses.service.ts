import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CoursesService {
    
 @InjectRepository(Course)
     private readonly coursesRepository: Repository<Course>

@InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  
       
 async findAll(){
    return this.coursesRepository.find({
        relations:{tags:true,},
    });
}

async findOne(id:string){
    const course =  await this.coursesRepository.findOne({where: {id},relations:{tags:true}})
    if (!course){
        throw new HttpException(`Course ID ${id} not fund `, HttpStatus.NOT_FOUND)
    }
    return course;
}

async create(createCourseDto: CreateCourseDto){
    const tags = await Promise.all(
        createCourseDto.tags.map(name=>this.preloadTagByName(name)),
    )
    const course = this.coursesRepository.create({... createCourseDto,tags})
    return this.coursesRepository.save(course)
}

/*
primeiro cria a função update passando como parâmetro o id do tipo number e updateCourseDTo: que pode ser qualquer tipo
depois ele cria uma variável que recebe a função find one que basicamente procura um curso por id no array de cursos e caso encontre 
retorna o objeto curso , caso a variável existCourse seja truthy ou exista ele cria uma constante que recebe o índice do curso 
com o primeiro id que bate com o id passado por parâmetro e depois ele
Pega esse id e coloca como parâmetro para acessar diretamente o curso no array e com isso ele altera diretamente o objeto dentro 
do array na ordem que foi inserida os dados e caso esteja faltando um atributo que não será alterado, 
nesssa construção esse atributo e perdido pois ele não altera o objeto ele substitui um objeto interio.
 async update(id:number,updateCourseDto:any){
    const existCourse = this.findOne(id);
    if (existCourse as any) {
        const index = this.courses.findIndex(course => course.id === id);
        this.courses[index] = {
            id,
            ...updateCourseDto,
        }

    }
}
*/
async update(id:string,updateCourseDto: UpdateCourseDto){
     const tags = updateCourseDto.tags && await Promise.all(
        updateCourseDto.tags.map(name=>this.preloadTagByName(name)),
    )
    const  course = await this.coursesRepository.preload({
        ... updateCourseDto, 
        id,
        tags
    })
     if (!course){
         throw new HttpException(`Course ID ${id} not fund `, HttpStatus.NOT_FOUND)
    }
    return this.coursesRepository.save(course)
     }




async remove(id:string){
     const  course = await this.coursesRepository.findOne({
        where:{id},
    })
    if(!course){
        throw new HttpException(`Course ID ${id} not fund `, HttpStatus.NOT_FOUND)
    }
    return this.coursesRepository.remove(course)
    
}

private async preloadTagByName(name:string): Promise<Tag>  {
    const tags = await this.tagsRepository.findOne({where:{name}})
    if (tags){
        return tags
    }
    return this.tagsRepository.create({name})


}


}
