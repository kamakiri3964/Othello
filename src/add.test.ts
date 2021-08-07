import { add } from './add';

test('add_function_returns_sum_of_two_number', () => {
  let result = add(1, 1);
  expect(result).toBe(2);
  result = add(-1, 1);
  expect(result).toBe(0);
  result = add(-1, -1);
  expect(result).toBe(-2);
  result = add(100, 222);
  expect(result).toBe(322);
});
