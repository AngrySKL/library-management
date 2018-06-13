import { FilePreviewOverlayComponent } from './components/filepreview/file-preview-overlay/file-preview-overlay.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material/material.module';
import { RoutingModule } from './modules/routing/routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './shared/services/login/login.service';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { UserComponent } from './components/user/user.component';
import { BookDetailComponent, MessageDialog } from './components/book/book-detail/book-detail.component';
import { BookListComponent, ActionConfirmDialog } from './components/book/book-list/book-list.component';
import { BookService } from './shared/services/book/book.service';
import { MaterialFileUploadComponent } from './components/fileupload/material-file-upload/material-file-upload.component';
import { MaterialFileUploadQueueComponent } from './components/fileupload/material-file-upload-queue/material-file-upload-queue.component';
import { BytesPipe } from './shared/pipe/bytes/bytes.pipe';
import { FileUploadInputForDirective } from './components/fileupload/file-upload-input-for.directive';
// tslint:disable-next-line:max-line-length
import { FilePreviewOverlayToolbarComponent } from './components/filepreview/file-preview-overlay-toolbar/file-preview-overlay-toolbar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilePreviewOverlayService } from './shared/services/filepreview/file-preview-overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BookComponent,
    UserComponent,
    BookDetailComponent,
    BookListComponent,
    ActionConfirmDialog,
    MessageDialog,
    MaterialFileUploadComponent,
    MaterialFileUploadQueueComponent,
    BytesPipe,
    FileUploadInputForDirective,
    FilePreviewOverlayComponent,
    FilePreviewOverlayToolbarComponent
  ],
  entryComponents: [
    ActionConfirmDialog,
    MessageDialog,
    FilePreviewOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RoutingModule,
    MaterialModule,
    HttpClientModule,
    OverlayModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    BookService,
    FilePreviewOverlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
