import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, AfterViewInit, ContentChildren, forwardRef, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MaterialFileUploadComponent } from '../material-file-upload/material-file-upload.component';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';

@Component({
  selector: 'app-material-file-upload-queue',
  templateUrl: './material-file-upload-queue.component.html',
  styleUrls: ['./material-file-upload-queue.component.css']
})
export class MaterialFileUploadQueueComponent implements OnDestroy, AfterViewInit {

  public files: Array<File> = [];

  private _changeSubscription: Subscription | null;
  private _fileRemoveSubscription: Subscription | null;

  @Input()
  httpUrl: string;

  @Input()
  httpRequestHeaders: HttpHeaders | {
    [header: string]: string | string[];
  } = new HttpHeaders();

  @Input()
  httpRequestParams: HttpParams | {
    [param: string]: string | string[];
  } = new HttpParams();

  @Input()
  fileAlias = 'file';

  @ContentChildren(forwardRef(() => MaterialFileUploadComponent)) fileUploads: QueryList<MaterialFileUploadComponent>;

  get allFileUploadRemoveEvents() {
    return merge(...this.fileUploads.map(fileUpload => fileUpload.removeEvent));
  }

  constructor() { }

  ngOnDestroy() {
    if (this.files) { this.removeAll(); }
  }

  ngAfterViewInit() {
    this._changeSubscription = this.fileUploads.changes.pipe(startWith(null)).subscribe(() => {
      if (this._fileRemoveSubscription) {
        this._fileRemoveSubscription.unsubscribe();
      }
      this._listenToFileRemoved();
    });
  }

  private _listenToFileRemoved(): void {
    this._fileRemoveSubscription = this.allFileUploadRemoveEvents.subscribe((event: MaterialFileUploadComponent) => {
      this.files.splice(event.id, 1);
    });
  }

  public add(file: File) {
    this.files.push(file);
  }

  public removeAll(): void {
    this.files.splice(0, this.files.length);
  }

  public uploadAll(): void {
    this.fileUploads.forEach( fileUpload => fileUpload.upload() );
  }
}
