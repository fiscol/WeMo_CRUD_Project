import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add Swagger document settings
  const options = new DocumentBuilder()
    .setTitle('WeMo CRUD Project example')
    .setDescription('The WeMo CRUD API description')
    .setVersion('1.0')
    .addTag('WeMo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
