import { BookDetailComponent } from './../../components/book/book-detail/book-detail.component';
import { BookListComponent } from './../../components/book/book-list/book-list.component';
import { UserComponent } from './../../components/user/user.component';
import { BookComponent } from './../../components/book/book.component';
import { HomeComponent } from './../../components/home/home.component';
import { LoginComponent } from './../../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', redirectTo: '/home/book', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', component: BookComponent },
      { path: 'book', component: BookComponent,
    children: [
      { path: '', component: BookListComponent },
      { path: 'add', component: BookDetailComponent },
      { path: 'detail', component: BookDetailComponent }
    ] },
      { path: 'user', component: UserComponent }
    ]},
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ]
})
export class RoutingModule { }
