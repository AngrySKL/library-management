import { Observable } from 'rxjs/Observable';
import { BookService, Book } from './../../../shared/services/book/book.service';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'title', 'author', 'publisher', 'ISBN', 'Operation'];
  dataSource = new MatTableDataSource<Book>(this.bookSvc.getBooks().books);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookSvc: BookService,
  private dialog: MatDialog) { }

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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.html',
})
export class DeleteConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
