import { MatCardModule, MatInputModule, MatButtonModule,
  MatToolbarModule, MatIconModule, MatMenuModule,
  MatSidenavModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule
  ],
  exports: [
    MatCardModule, MatInputModule, MatButtonModule,
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatSidenavModule, MatListModule
  ],
  declarations: [
  ]
})
export class MaterialModule { }
