import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private service: BookService) {}

  @Query(() => [Book])
  books() {
    return this.service.findAll();
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    await this.service.create(input);
    return { success: true, message: 'Book created successfully' };
  }

  @Mutation(() => Boolean)
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateBookInput,
  ) {
    await this.service.update(id, input);
    return { success: true, message: 'Book updated successfully' };
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id', { type: () => Int }) id: number) {
    await this.service.delete(id);
    return { success: true, message: 'Book deleted successfully' };
  }
}
