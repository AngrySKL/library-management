import { Book } from './book.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {

  tmpBookResponse: BookResponse;

  constructor() {
    // add mock books
    const tmpBooks = [];
    for (let i = 0; i < 30; i++) {
      tmpBooks.push({ id: i, title: `title ${i}`,
                      author: `author ${i}`, publisher: `publisher ${i}`,
                      coverUrl: `coverUrl ${i}`, ISBN: `ISBN ${i}`});
    }
    this.tmpBookResponse = new BookResponse();
    this.tmpBookResponse.books = tmpBooks;
    this.tmpBookResponse.totalCount = 30;
  }

  getBooks(): BookResponse {
    return this.tmpBookResponse;
  }
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  ISBN: string;
  coverUrl: string;
}

export class BookResponse {
  books: Book[];
  totalCount: number;
}
