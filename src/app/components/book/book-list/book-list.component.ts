import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BookService, Book } from './../../../shared/services/book/book.service';
import { Component, OnInit, ViewChild, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['id', 'title', 'author', 'publisher', 'ISBN', 'Operation'];
  dataSource = new MatTableDataSource<Book>();
  searchTerm: string;
  alive: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookSvc: BookService, private dialog: MatDialog, private routeInfo: ActivatedRoute) {
    this.searchTerm = this.routeInfo.snapshot.params['searchTerm'];
    this.alive = true;
  }

  confirmBeforeDelation(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      height: '200px',
      data: { bookTitle: id }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        console.log(`you are trying to delete book ${id}`);
      }
    });
  }

  deleteBook(event: any, id: number) {
    event.preventDefault();
    console.log(`try to delete ${id}`);
  }

  ngOnInit() {
    this.bookSvc.getBooks()
    .takeWhile(() => this.alive)
    .subscribe(response => {
      this.dataSource.data = response.books;
      this.applyFliter(this.searchTerm);
    });
    this.bookSvc.searchBook
    .takeWhile(() => this.alive)
    .subscribe(searchTerm => {
      this.applyFliter(searchTerm);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFliter(fliterValue: string) {
    if (_.isNil(fliterValue)) { return; }
    fliterValue = fliterValue.trim();
    fliterValue = fliterValue.toLowerCase();
    this.dataSource.filter = fliterValue;
  }

}

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.html',
})
export class DeleteConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
