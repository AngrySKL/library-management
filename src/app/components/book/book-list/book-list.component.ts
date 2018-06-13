import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BookService, Book } from './../../../shared/services/book/book.service';
import { Component, OnInit, ViewChild, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash';
import 'rxjs/add/operator/takeWhile';
import { FilePreviewOverlayService } from '../../../shared/services/filepreview/file-preview-overlay.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['id', 'title', 'author', 'publisher', 'ISBN', 'coverUrl', 'borrowerId', 'Operation'];
  dataSource = new MatTableDataSource<Book>();
  searchTerm: string;
  alive: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookSvc: BookService,
              private dialog: MatDialog,
              private routeInfo: ActivatedRoute,
              private router: Router,
              private filePreviewSvc: FilePreviewOverlayService) {
    this.searchTerm = this.routeInfo.snapshot.params['searchTerm'];
    this.alive = true;
  }

  getBooks() {
    this.bookSvc.getBooks().takeWhile(() => this.alive).subscribe(response => {
      this.dataSource.data = response.books;
      this.applyFliter(this.searchTerm);
    });
  }

  confirmBeforeDelation(id: number, title: string) {
    const dialogRef = this.dialog.open(ActionConfirmDialog, {
      height: '200px',
      data: { message: `Do you really want to delete ${title} ?` }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.bookSvc.deleteBook(id).subscribe(res => {
          if (res.code === 200) {
            this.getBooks();
          }
        });
      }
    });
  }

  confirmBeforeReturn(id: number, title: string) {
    const dialogRef = this.dialog.open(ActionConfirmDialog, {
      height: '200px',
      data: { message: `Do you really want to return ${title} ?` }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.bookSvc.returnBook(id).subscribe(res => {
          if (res.code === 200) {
            this.getBooks();
          }
        });
      }
    });
  }

  deleteBook(event: any, id: number) {
    event.preventDefault();
    console.log(`try to delete ${id}`);
  }

  ngOnInit() {
    this.getBooks();
    this.bookSvc.searchBook.takeWhile(() => this.alive).subscribe(searchTerm => {
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

  showPreview(bookName, bookCoverUrl) {
    const dialogRef = this.filePreviewSvc.open({ image: { name: bookName, url: bookCoverUrl } });
  }
}

@Component({
  selector: 'app-action-confirm-dialog',
  templateUrl: 'action-confirm-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ActionConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
