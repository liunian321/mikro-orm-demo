import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  // await app.init();
  //
  // const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  // const schema = await gqlSchemaFactory.create([
  //   PostResolver,
  //   UserResolver,
  //   CategoryResolver,
  // ]);
  // console.log(printSchema(schema));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
