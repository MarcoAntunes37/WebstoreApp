import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditCardComponent } from './edit-credit-card.component';

describe('EditCreditCardComponent', () => {
  let component: EditCreditCardComponent;
  let fixture: ComponentFixture<EditCreditCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCreditCardComponent]
    });
    fixture = TestBed.createComponent(EditCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
