import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivePackageComponent } from './receive-package.component';

describe('ReceivePackageComponent', () => {
  let component: ReceivePackageComponent;
  let fixture: ComponentFixture<ReceivePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
