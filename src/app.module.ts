import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TurmaModule } from './turma/turma.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';
import { MongooseModule } from '@nestjs/mongoose'; // Importe o MongooseModule
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentModule } from './planilhas/experiment/experiment.module';
import { UserModule } from './planilhas/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para que o ConfigService esteja disponível globalmente
    }),
    MongooseModule.forRootAsync({ // Adicione esta configuração para a conexão com o MongoDB
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PeriodoLetivoModule,
    ExperimentModule,
    UserModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}