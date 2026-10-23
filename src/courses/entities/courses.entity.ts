import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity.js"
import { randomUUID } from "node:crypto"

@Entity('courses')
export class Course{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name: string

    @Column()
    description : string

    @JoinTable()
    @ManyToMany(() => Tag, tag=> tag.courses, {cascade:true})
    tags: Tag[]

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