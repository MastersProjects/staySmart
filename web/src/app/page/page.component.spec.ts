import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BannerComponent} from './banner/banner.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PageComponent,
        BannerComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
