import { beforeAll } from 'vitest';
import { getCurrentTest, type Test } from '../getCurrentTest';

/**
 * Disable automatic test snapshotting
 * - When called within `test()`, it disables snapshotting for that test.
 * - When called within `describe()`, it disables snapshotting for all tests within that describe block.
 * - When called at the top level, it disables snapshotting for all tests in the file.
 */
export function disableAutoSnapshot() {
  const test = getCurrentTest();

  // Called within test()
  if (test) {
    test.meta.__chromatic_autoSnapshot = false;
    return;
  }

  // Called at top level or within describe().
  // Wrap suite traversal in beforeAll to make sure it runs after test collection.
  beforeAll(({}, suite) => {
    traverseTests(suite);

    function traverseTests(task: (typeof suite.tasks)[0]) {
      if (task.type === 'test') {
        (task as Test).meta.__chromatic_autoSnapshot = false;
        return;
      }

      task.tasks.forEach(traverseTests);
    }
  });
}
