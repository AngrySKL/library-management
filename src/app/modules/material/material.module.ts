import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatCardModule, MatInputModule, MatButtonModule
  ],
  exports: [
    MatCardModule, MatInputModule, MatButtonModule
  ],
  declarations: [
  ]
})
export class MaterialModule { }
