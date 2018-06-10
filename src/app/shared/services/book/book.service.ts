import { Observable } from 'rxjs/Observable';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  @Output() searchBook: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {}

  getBooks(): Observable<BooksResponse> {
    return this.http.get<BooksResponse>('/api/books').map(res => {
      return new BooksResponse(res.books, res.totalCount);
    });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/detail/${id}`).map(res => {
      return new Book(res.id, res.title, res.author, res.publisher, res.ISBN, res.coverUrl);
    });
  }

  saveBook(id: number, title: string, author: string, publisher: string, ISBN: string): Observable<any> {
    return this.http
    .post('/api/books/save', { id: id, title: title, author: author, publisher: publisher, ISBN: ISBN });
  }

  addBook(title: string, author: string, publisher: string, ISBN: string): Observable<any> {
    return this.http
    .post('/api/books/add', { title: title, author: author, publisher: publisher, ISBN: ISBN });
  }

  deleteBook(id: number): Observable<any> {
    return this.http
    .post('/api/books/delete', { id: id });
  }

  returnBook(id: number): Observable<any> {
    return this.http
    .post('/api/books/return', { id: id });
  }
}

export class Book {
  constructor(public id: number,
    public title: string,
    public author: string,
    public publisher: string,
    public ISBN: string,
    public coverUrl: string) {}
}

export class BooksResponse {
  constructor(public books: Book[], public totalCount: number) {}
}
