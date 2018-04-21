import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BookService } from '../../shared/services/book/book.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  searchInput: FormControl = new FormControl();
  alive: boolean;

  constructor(private bookSvc: BookService) {
    this.alive = true;
    this.searchInput.valueChanges
    .debounceTime(500)
    .takeWhile(() => this.alive)
    .subscribe(searchTerm => { this.bookSvc.searchBook.emit(searchTerm); });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
