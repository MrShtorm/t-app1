import { NestFactory } from '@nestjs/core';
import { AppModule } from './features/app.module';
import { ConfigService } from '@nestjs/config';
import { appSetup } from './core/setup';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appSetup(app);
  const port = new ConfigService().get('PORT') || 3000;
  const host = new ConfigService().get('PG_HOST');

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    console.log(`Server started on port: ${port}, database host: ${host}`);
  });
}
bootstrap();
