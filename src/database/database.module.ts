import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {DataSourceOptions} from 'typeorm'
import { Course } from '../courses/entities/courses.entity.js'
import { Tag } from '../courses/entities/tags.entity.js'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'




@Module({ //cria um modulo nest e informa a dependencia usada
    imports:[TypeOrmModule.forRootAsync({  //configura a integração do TypeORM com o banco de dados usando uma config obtida pela função
        useFactory:  async (configService:ConfigService) => { // uma função que produz o objeto de config pelo TypeORM
            return{
                    type:'postgres', //tipo do banco
                    host:  configService.get('DB_HOST'), // conexão do host
                    port: Number(configService.get('DB_PORT')),// porta declarada no nosso dockerfile
                    username: configService.get('DB_USER'),// usuario no bd
                    password: configService.get('DB_PASS'), // senha do bd
                    database: configService.get('DB_NAME'), // nome do bd
                    entities: [Course, Tag], // as entidades do bd
                    synchronize: false, // faz a sincronização das nossas entidades para efetuar a criação automatica das entidadews
                }
        },
        inject: [ConfigService],
    }),
],
})
export class DatabaseModule {}
