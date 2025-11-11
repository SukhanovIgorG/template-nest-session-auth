import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger settings
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The BAS API description')
    .setVersion('1.0')
    .addTag('BAS')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  // Disable CORS for all origins
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  // Cookie parser middleware
  app.use(cookieParser());
  // Helmet middleware
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }),
  );
  // Start the server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
