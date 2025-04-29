import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'uploads'), 
      serveRoot: '/uploads', 
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
