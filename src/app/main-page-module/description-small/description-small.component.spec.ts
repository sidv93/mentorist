import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSmallComponent } from './description-small.component';

describe('DescriptionSmallComponent', () => {
  let component: DescriptionSmallComponent;
  let fixture: ComponentFixture<DescriptionSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
