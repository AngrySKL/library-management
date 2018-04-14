import { UserComponent } from './../../components/user/user.component';
import { BookComponent } from './../../components/book/book.component';
import { HomeComponent } from './../../components/home/home.component';
import { LoginComponent } from './../../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
    children: [
      {path: '', component: BookComponent},
      {path: 'book', component: BookComponent},
      {path: 'user', component: UserComponent}
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
