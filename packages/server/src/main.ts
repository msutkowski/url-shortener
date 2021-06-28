import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const { PORT = 5679 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Shortnr')
    .setDescription('This is a very minimal API to shorten URLs')
    .setVersion('1.0')
    .addTag('links')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(PORT);

  console.log(`Shrtnr API is running on: ${await app.getUrl()}`);
}

bootstrap();
