import { FilePreviewOverlayRef } from './../file-preview-overlay-ref';
import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-file-preview-overlay-toolbar',
  templateUrl: './file-preview-overlay-toolbar.component.html',
  styleUrls: ['./file-preview-overlay-toolbar.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ transform: 'translateY(-100%)' })),
      state('enter', style({ transform: 'translateY(0)' })),
      state('leave', style({ transform: 'translateY(-100%)' })),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ]
})
export class FilePreviewOverlayToolbarComponent implements OnInit {
  @HostBinding('@slideDown') slideDown = 'enter';

  constructor(private dialogRef: FilePreviewOverlayRef) { }

  ngOnInit() {
    this.dialogRef.beforeClose().subscribe(_ => this.slideDown = 'leave');
  }

}
