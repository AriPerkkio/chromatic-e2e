import { expect, test } from 'vitest';
import { takeSnapshot } from '../../src';

test('test #1', async () => {
  document.body.innerHTML = '<h1>Example heading</h1>';

  await takeSnapshot();

  expect.fail('Should not reach this point');
});
