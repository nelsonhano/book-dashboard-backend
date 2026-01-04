import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Resolver(() => Book)
export class BookResolver {
  constructor(private service: BookService) {}

  @Query(() => [Book])
  books() {
    return this.service.findAll();
  }

  @Mutation(() => Book)
  createBook(
    @Args('name') name: string,
    @Args('description') description: string,
  ) {
    return this.service.create({ name, description });
  }

  @Mutation(() => Boolean)
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id).then(() => true);
  }
}
