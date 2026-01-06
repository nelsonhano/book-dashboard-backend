import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { BookModule } from './book/book.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { Book } from './book/book.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    BookModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Book],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
