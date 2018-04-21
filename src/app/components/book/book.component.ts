import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BookService } from '../../shared/services/book/book.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookSvc: BookService) {
   }

  ngOnInit() {
  }

  onEnter(searchTerm: string) {
    this.bookSvc.searchBook.emit(searchTerm);
  }

}
