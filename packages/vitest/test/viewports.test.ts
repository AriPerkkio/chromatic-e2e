import { describe } from 'vitest';
import { page } from 'vitest/browser';
import { test } from './utils/browser';

test('snapshots capture the correct viewport size', async ({ goTo }) => {
  await goTo('/viewports');
});

describe('hardcoded viewport', () => {
  test('snapshots capture the correct viewport size', async ({ goTo }) => {
    await page.viewport(800, 720);

    await goTo('/viewports');
  });
});
