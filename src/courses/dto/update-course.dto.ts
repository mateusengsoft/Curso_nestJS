import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto.js";


export class UpdateCourseDto extends PartialType(CreateCourseDto){}

// ? diz que é um atributo opcional!
// Ao usar o partialType nos dizemos que as restrições e atributos que criamos em create... valem também para Update... portanto não temos que rescrever codigo e por ser parcialmente 
// isso também nos diz que podemos ter todos atributos ou não.