import { expect, test, vi } from 'vitest';
import * as shared from '@chromatic-com/shared-e2e';
import { runFixture } from '../../../test/utils/node';

/** See {@link file://./../../../test/fixtures/take-snapshot.test.ts} */
const include = ['take-snapshot.test.ts'];

test('provides descriptive error when called in non-registered test', async () => {
  const { stderr } = await runFixture(
    { include },
    { disableAutoSnapshot: true, tags: ['unused-tag'] }
  );

  expect(stderr).toMatchInlineSnapshot(`
    "
    ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

     FAIL   chromium  take-snapshot.test.ts > test #1
    Error: takeSnapshot() cannot be called in a test that is not registered for Chromatic plugin
     ❯ take-snapshot.test.ts:7:8
          5|   document.body.innerHTML = '<h1>Example heading</h1>';
          6|
          7|   await takeSnapshot();
           |        ^
          8|
          9|   expect.fail('Should not reach this point');

    ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯"
  `);
});

test.todo('provides descriptive error when not awaited');
