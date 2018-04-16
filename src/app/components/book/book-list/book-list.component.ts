import { Observable } from 'rxjs/Observable';
import { BookService, Book } from './../../../shared/services/book/book.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'title', 'author', 'publisher', 'ISBN'];
  dataSource = new MatTableDataSource<Book>(this.bookSvc.getBooks().books);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookSvc: BookService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
