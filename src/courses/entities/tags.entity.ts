import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./courses.entity.js";
import { randomUUID } from "node:crypto";

@Entity('tags')
export class Tag{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string
    
    @ManyToMany(()=> Course, courses => courses.tags)
    courses: Course[]

    @CreateDateColumn({type:'timestamp',nullable:true,default:() => 'CURRENT_TIMESTAMP',})
    created_at: Date

    @BeforeInsert()
    generatedId(){
        if(this.id){
            return
        }
        this.id = randomUUID();
    }
}