import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreditCardComponent } from './new-credit-card.component';

describe('NewCreditCardComponent', () => {
  let component: NewCreditCardComponent;
  let fixture: ComponentFixture<NewCreditCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NewCreditCardComponent]
});
    fixture = TestBed.createComponent(NewCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
