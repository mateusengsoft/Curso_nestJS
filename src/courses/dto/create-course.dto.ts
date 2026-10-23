import { IsString } from "class-validator"

export class CreateCourseDto{
@IsString() 
readonly name: string

@IsString() 
readonly description :string

@IsString({each: true})  // valida cada elemento individualmente para STRING


readonly  tags: string[]
}