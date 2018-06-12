import { TestBed, inject } from '@angular/core/testing';

import { FilePreviewOverlayService } from './file-preview-overlay.service';

describe('FilePreviewOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilePreviewOverlayService]
    });
  });

  it('should be created', inject([FilePreviewOverlayService], (service: FilePreviewOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
