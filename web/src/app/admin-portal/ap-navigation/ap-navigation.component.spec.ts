import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApNavigationComponent} from './ap-navigation.component';

describe('ApNavigationComponent', () => {
  let component: ApNavigationComponent;
  let fixture: ComponentFixture<ApNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApNavigationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogout', () => {
    it('should emit logout event', () => {
      spyOn(component.logout, 'emit');
      component.onLogout();
      expect(component.logout.emit).toHaveBeenCalled();
    });
  });
});
