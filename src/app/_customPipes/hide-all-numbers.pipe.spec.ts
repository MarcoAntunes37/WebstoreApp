import { HideAllNumbersPipe } from './hide-all-numbers.pipe';

describe('HideNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new HideAllNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
