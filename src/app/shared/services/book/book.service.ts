import { Observable } from 'rxjs/Observable';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  saveBook(id: number, title: string, author: string, publisher: string, ISBN: string, cover: File): Observable<any> {
    const formData = new FormData();
    formData.set('title', title);
    formData.set('author', author);
    formData.set('publisher', publisher);
    formData.set('ISBN', ISBN);
    if (cover) { formData.set('cover', cover, cover.name); }

    return this.http
    .post('/api/books/save', formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'json'
    });
  }

  addBook(title: string, author: string, publisher: string, ISBN: string, cover: File): Observable<any> {
    const formData = new FormData();
    formData.set('title', title);
    formData.set('author', author);
    formData.set('publisher', publisher);
    formData.set('ISBN', ISBN);
    if (cover) { formData.set('cover', cover, cover.name); }

    return this.http
    .post('/api/books/add', formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'json'
    });
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
