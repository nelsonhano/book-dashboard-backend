import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { UpdateBookResponse } from './dto/update-book.res';
import { DeleteBookResponse } from './dto/delete-book.res';

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [Book])
  books() {
    return this.bookService.findAll();
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    const book = await this.bookService.create(input);
    return book;
  }

  @Mutation(() => UpdateBookResponse)
  async updateBook(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateBookInput,
  ): Promise<UpdateBookResponse> {
    const updateBook = await this.bookService.update(id, input);
    return {
      success: true,
      message: 'Book updated successfully',
      affected: updateBook.affected || 0,
    };
  }

  @Mutation(() => DeleteBookResponse)
  async deleteBook(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<DeleteBookResponse> {
    await this.bookService.delete(id);
    return { success: true, message: 'Book deleted successfully' };
  }
}
