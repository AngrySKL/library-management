import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  message: string;

  constructor(private routerInfo: ActivatedRoute) {
    const bookId = routerInfo.snapshot.params['id'];
    if (bookId) {
      this.message = `You are editing book ${bookId}!`;
    } else {
      this.message = 'You are adding book!';
    }
  }

  ngOnInit() {
  }

}
