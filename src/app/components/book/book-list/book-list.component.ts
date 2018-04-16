import { BookService, Book } from './../../../shared/services/book/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  displayedColumns = ['id', 'title', 'author', 'publisher', 'ISBN'];
  dataSource: Book[];

  constructor(private bookSvc: BookService) { }

  ngOnInit() {
    this.dataSource = this.bookSvc.getBooks().books;
  }

}
