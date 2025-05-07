import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Example')  // Nome do seu API
    .setDescription('A descrição da sua API')  // Descrição
    .setVersion('1.0')  // Versão da API
    .addTag('cats')  // Adiciona uma tag (se tiver tags)
    .build();
  
  // Criando o documento Swagger
  const document = SwaggerModule.createDocument(app, config);
  
  // Configura a rota para acessar o Swagger UI
  SwaggerModule.setup('api', app, document);  // Agora você acessa em /api

  // Inicia o servidor
  await app.listen(3001);
}

bootstrap();
