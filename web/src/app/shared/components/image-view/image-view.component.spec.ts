import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ImageViewComponent} from './image-view.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('ImageViewComponent', () => {
  let component: ImageViewComponent;
  let fixture: ComponentFixture<ImageViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageViewComponent],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
