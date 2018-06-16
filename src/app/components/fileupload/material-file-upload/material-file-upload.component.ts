import { FilePreviewOverlayService } from './../../../shared/services/filepreview/file-preview-overlay.service';
import { MaterialFileUploadQueueComponent } from './../material-file-upload-queue/material-file-upload-queue.component';
import { Component, OnDestroy, Inject, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-material-file-upload',
  templateUrl: './material-file-upload.component.html',
  styleUrls: ['./material-file-upload.component.css']
})
export class MaterialFileUploadComponent implements OnDestroy {
  private _file: File;
  private _id: number;
  private _fileUploadSubscription: any;

  public total = 0;
  public isUploading = false;
  public loaded = 0;
  public progressPercentage = 0;

  @Input()
  httpUrl = 'http://localhost:8000';

  @Input()
  httpRequestHeaders: HttpHeaders | { [header: string]: string | string[]; } = new HttpHeaders();

  @Input()
  httpRequestParams: HttpParams | { [param: string]: string | string[]; } = new HttpParams();

  @Input()
  fileAlias = 'file';

  @Input()
  previewUrl: string;

  @Input()
  fileName: string;

  @Input()
  fileSize: string;

  @Input()
  get file(): File {
    return this._file;
  }
  set file(file: File) {
    this._file = file;
    this.total  = this._file.size;
  }

  @Input()
  get id() {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  @Output() removeEvent = new EventEmitter<MaterialFileUploadComponent>();
  @Output() uploadEvent = new EventEmitter();

  constructor(private http: HttpClient,
    private filePreviewSvc: FilePreviewOverlayService) {
    }

  ngOnDestroy() {
  }

  public remove(): void {
    if (this._fileUploadSubscription) { this._fileUploadSubscription.unsubscribe(); }
    this.removeEvent.emit(this);
  }

  public showPreview(): void {
    const dialogRef = this.filePreviewSvc.open({ image: { name: this.fileName, url: this.previewUrl } });
  }

  public upload(): void {
    this.isUploading = true;
    const formData = new FormData();
    formData.set(this.fileAlias, this._file, this._file.name);
    formData.set('bookId', this._id ? this._id.toString() : null);
    this._fileUploadSubscription = this.http.post(this.httpUrl, formData, {
      headers: this.httpRequestHeaders,
      observe: 'events',
      params: this.httpRequestParams,
      reportProgress: true,
      responseType: 'json'
    }).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressPercentage = Math.floor(event.loaded * 100 / event.total);
        this.loaded = event.loaded;
        this.total = event.total;
      }
      this.uploadEvent.emit({ file: this._file, event: event });
    }, (error: any) => {
      if (this._fileUploadSubscription) { this._fileUploadSubscription.unsubscribe(); }
      this.isUploading = false;
      this.uploadEvent.emit({ file: this._file, event: event });
    });
  }
}
