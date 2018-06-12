import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from './../../../shared/services/book/book.service';
import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/operator/takeWhile';
import { MaterialFileUploadQueueComponent } from '../../fileupload/material-file-upload-queue/material-file-upload-queue.component';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  alive: boolean;
  action: string;
  formModel: FormGroup;
  bookId: number;

  @ViewChild('file') file: ElementRef;
  @ViewChild('fileUploadQueue') uploadQueue: MaterialFileUploadQueueComponent;

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private bookSvc: BookService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.alive = true;
    const bookId = routeInfo.snapshot.params['id'];
    this.formModel = fb.group({ title: [''], author: [''], publisher: [''], ISBN: [''] });
    if (bookId) {
      this.bookSvc.getBook(bookId).subscribe(book => {
        this.formModel.setValue({
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          ISBN: book.ISBN
        });
      });
      this.action = 'EDITING';
    } else {
      this.action = 'ADDING';
    }
    this.bookId = bookId;
  }

  ngOnInit() {
    this.bookSvc.searchBook
    .takeWhile(() => this.alive)
    .subscribe(searchTerm => {
      this.router.navigate(['home/book', { searchTerm: searchTerm }]);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  openFileDialog() {
    this.file.nativeElement.click();
  }

  save() {
    const title = this.formModel.get('title').value;
    const author = this.formModel.get('author').value;
    const publisher = this.formModel.get('publisher').value;
    const ISBN = this.formModel.get('ISBN').value;

    if (this.bookId) {
      this.bookSvc.saveBook(this.bookId, title, author, publisher, ISBN, this.uploadQueue.files[0]).subscribe(res => {
          if (res.type === HttpEventType.Response) {
            if (res.code === 200) {
              const dialogRef = this.dialog.open(MessageDialog, {
                height: '180px',
                data: { message: res.message }
              });
          }
        }
      });
    } else {
      this.bookSvc.addBook(title, author, publisher, ISBN, this.uploadQueue.files[0]).subscribe(res => {
        if (res.type === HttpEventType.Response) {
          if (res.body.code === 200) {
            const dialogRef = this.dialog.open(MessageDialog, {
              height: '180px',
              data: { message: res.body.message }
            });
            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['home/book']);
            });
          } else {
            const dialogRef = this.dialog.open(MessageDialog, {
              height: '180px',
              data: { message: res.body.message }
            });
          }
        }
      });
    }
  }
}

@Component({
  selector: 'app-message-dialog',
  styles: [
    `.full-width {
      flex: 1
    } `
  ],
  templateUrl: 'message-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class MessageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
