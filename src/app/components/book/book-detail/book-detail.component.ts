import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from './../../../shared/services/book/book.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/takeWhile';

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

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private bookSvc: BookService,
              private fb: FormBuilder) {
    this.alive = true;
    const bookId = routeInfo.snapshot.params['id'];
    if (bookId) {
      // TODO: get specific book by bookId and fill the form
      this.formModel = fb.group({
        title: [''],
        author: [''],
        publisher: [''],
        ISBN: ['']
      });
      this.action = 'EDITING';
    } else {
      this.formModel = fb.group({
        title: [''],
        author: [''],
        publisher: [''],
        ISBN: ['']
      });
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

  save() {
    if (this.action === 'Editing') {
      /// perform editing logic
    } else if (this.action === 'Adding') {
      // perform adding logic
    }
  }
}
