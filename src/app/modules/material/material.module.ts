import { MatCardModule, MatInputModule, MatButtonModule,
  MatToolbarModule, MatIconModule, MatMenuModule,
  MatSidenavModule, MatListModule, MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule, MatTableModule
  ],
  exports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule, MatTableModule
  ],
  declarations: [
  ]
})
export class MaterialModule { }
