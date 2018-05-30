import { Book } from './book.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  @Output() searchBook: EventEmitter<string> = new EventEmitter();

  constructor(private http: Http) {}

  getBooks(): Observable<BooksResponse> {
    return this.http.get('/api/books').map(res => res.json());
  }

  getBook(id: number): Observable<Book> {
    return this.http.get(`/api/books/detail/${id}`).map(res => {
      const result = res.json();
      return {
        id: result.id,
        title: result.title,
        author: result.author,
        publisher: result.publisher,
        ISBN: result.ISBN,
        coverUrl: result.coverUrl
      };
    });
  }

  saveBook(id: number, title: string, author: string, publisher: string, ISBN: string): Observable<any> {
    return this.http
    .post('/api/books/save', { id: id, title: title, author: author, publisher: publisher, ISBN: ISBN })
    .map(res => res.json());
  }

  addBook(title: string, author: string, publisher: string, ISBN: string): Observable<any> {
    return this.http
    .post('/api/books/add', { title: title, author: author, publisher: publisher, ISBN: ISBN })
    .map(res => res.json());
  }

  deleteBook(id: number): Observable<any> {
    return this.http
    .post('/api/books/delete', { id: id })
    .map(res => res.json());
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

export class BooksResponse {
  books: Book[];
  totalCount: number;
}
