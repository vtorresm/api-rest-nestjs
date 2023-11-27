import { CatsModule } from './cats/cats.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST_API,
      //port: parseInt(process.env.DATABASE_PORT_API, 10),
      port: 3307,
      username: process.env.DATABASE_USER_API,
      password: process.env.DATABASE_PASSWORD_API,
      database: process.env.DATABASE_DATABASE_API,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
