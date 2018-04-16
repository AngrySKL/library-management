import { MatCardModule, MatInputModule, MatButtonModule,
  MatToolbarModule, MatIconModule, MatMenuModule,
  MatSidenavModule, MatListModule, MatTableModule,
  MatPaginatorModule, MatSortModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule, MatTableModule,
    MatPaginatorModule, MatSortModule
  ],
  exports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule, MatTableModule,
    MatPaginatorModule, MatSortModule
  ],
  declarations: [
  ]
})
export class MaterialModule { }
