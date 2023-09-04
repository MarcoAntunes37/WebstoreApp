import { ShowServerErrorPipe } from './show-server-error.pipe';

describe('ShowServerErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ShowServerErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
