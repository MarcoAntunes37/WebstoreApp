import { HideCreditCardNumbersPipe } from './hide-credit-card-numbers.pipe';

describe('HideCreditCardNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new HideCreditCardNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
