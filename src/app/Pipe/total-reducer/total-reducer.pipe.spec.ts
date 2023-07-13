import { TotalReducerPipe } from './total-reducer.pipe';

describe('TotalReducerPipe', () => {
  it('create an instance', () => {
    const pipe = new TotalReducerPipe();
    expect(pipe).toBeTruthy();
  });
});
