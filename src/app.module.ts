import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // Importe o MongooseModule
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './planilhas/user/user.module';
import { DisciplinesModule } from './planilhas/disciplines/disciplines.module';
import { GeneralModule } from './general/general.module';
import { ClassesModule } from './planilhas/classes/classes.module';
import { EnrollmentModule } from './planilhas/enrollment/enrollment.module';
import { PeriodoLetivoModule } from './planilhas/periodo-letivo/periodo-letivo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
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
        synchronize: true,
        autoLoadEntities: true
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),    
    UserModule, 
    DisciplinesModule, 
    GeneralModule, 
    ClassesModule, 
    EnrollmentModule,
    PeriodoLetivoModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}