import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/master';
        const client = new MongoClient(uri);
        await client.connect();
        return client.db();
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'], // Garanta que 'DATABASE_CONNECTION' esteja aqui
})
export class DatabaseModule {}