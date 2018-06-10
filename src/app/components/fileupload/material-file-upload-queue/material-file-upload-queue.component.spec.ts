import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFileUploadQueueComponent } from './material-file-upload-queue.component';

describe('MaterialFileUploadQueueComponent', () => {
  let component: MaterialFileUploadQueueComponent;
  let fixture: ComponentFixture<MaterialFileUploadQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialFileUploadQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialFileUploadQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
