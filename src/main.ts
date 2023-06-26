import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cors = require("cors")
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: "https://localhost:3005",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }))
  const config = new DocumentBuilder()
    .setTitle('Auth Operation')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3005);
}
bootstrap();
