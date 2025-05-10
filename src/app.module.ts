import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // Importe o MongooseModule
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './planilhas/user/user.module';
import { SubjectModule } from './planilhas/subject/subject.module';
import { DisciplinesModule } from './planilhas/disciplines/disciplines.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para que o ConfigService esteja disponível globalmente
      envFilePath: ['.env'], // Caminho para o arquivo .env
    }),
    MongooseModule.forRootAsync({ // Adicione esta configuração para a conexão com o MongoDB
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10) || 3306,
        username: configService.get<string>('DB_USERNAME') || 'admin',
        password: configService.get<string>('DB_PASSWORD') || 'admin',
        database: configService.get<string>('DB_NAME') || 'database',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNC') ?? false,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),    
    UserModule, SubjectModule, DisciplinesModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}