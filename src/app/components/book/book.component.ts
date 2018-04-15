import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  searchInput: FormControl = new FormControl();

  constructor() {
    this.searchInput.valueChanges.debounceTime(500).subscribe(term => console.log(term));
   }

  ngOnInit() {
  }

}
