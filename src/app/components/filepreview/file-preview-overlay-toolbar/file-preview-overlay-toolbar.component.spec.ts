import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePreviewOverlayToolbarComponent } from './file-preview-overlay-toolbar.component';

describe('FilePreviewOverlayToolbarComponent', () => {
  let component: FilePreviewOverlayToolbarComponent;
  let fixture: ComponentFixture<FilePreviewOverlayToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePreviewOverlayToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePreviewOverlayToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
