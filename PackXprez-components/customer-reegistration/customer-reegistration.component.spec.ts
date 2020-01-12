import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReegistrationComponent } from './customer-reegistration.component';

describe('CustomerReegistrationComponent', () => {
  let component: CustomerReegistrationComponent;
  let fixture: ComponentFixture<CustomerReegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
