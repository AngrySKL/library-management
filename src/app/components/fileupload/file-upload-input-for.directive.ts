import { Directive, ElementRef, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[fileUploadInputFor], div[fileUploadInputFor]'
})
export class FileUploadInputForDirective {

  private _element: HTMLElement;
  private _queue: any = null;

  @Output() public fileSelectdEvent: EventEmitter<File[]> = new EventEmitter<File[]>();

  @Input('fileUploadInputFor')
  set fileUploadQueuq(value: any) { if (value) { this._queue = value; }}

  @HostListener('change')
  public onChange(): any {
    const files = this.element.nativeElement.files;
    this.fileSelectdEvent.emit(files);

    for (let i = 0; i < files.length; i++) {
      this._queue.add(files[i]);
    }
    this.element.nativeElement.value = '';
  }

  constructor(private element: ElementRef) {
    this._element = this.element.nativeElement;
   }
}
