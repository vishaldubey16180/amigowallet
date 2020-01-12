import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackResponseComponent } from './feedback-response.component';

describe('FeedbackResponseComponent', () => {
  let component: FeedbackResponseComponent;
  let fixture: ComponentFixture<FeedbackResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
