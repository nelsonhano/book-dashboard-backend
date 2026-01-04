import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Book>) {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }

  update(id: number, data: Partial<Book>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
