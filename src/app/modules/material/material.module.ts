import { MatCardModule, MatInputModule, MatButtonModule,
  MatToolbarModule, MatIconModule, MatMenuModule,
  MatSidenavModule, MatListModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatDialogModule,
    MatProgressBarModule
  ],
  exports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatDialogModule,
    MatProgressBarModule, MatProgressSpinnerModule
  ],
  declarations: [
  ]
})
export class MaterialModule { }
