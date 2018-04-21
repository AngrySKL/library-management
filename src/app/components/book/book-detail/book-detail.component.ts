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
  message: string;
  alive: boolean;

  constructor(private routeInfo: ActivatedRoute, private router: Router, private bookSvc: BookService) {
    this.alive = true;
    const bookId = routeInfo.snapshot.params['id'];
    if (bookId) {
      this.message = `You are editing book ${bookId}!`;
    } else {
      this.message = 'You are adding book!';
    }
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
}
