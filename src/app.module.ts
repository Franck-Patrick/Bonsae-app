import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TurmaModule } from './turma/turma.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para que o ConfigService esteja disponível globalmente
    }),
    DatabaseModule,
    TurmaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 