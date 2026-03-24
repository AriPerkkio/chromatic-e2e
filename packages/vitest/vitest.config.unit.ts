import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    name: { label: 'Vitest Unit', color: 'yellow' },
    include: ['src/**/*.test.ts'],
    exclude: ['**/*.browser.test.ts'],
    setupFiles: ['test/utils/setup.ts'],
    mockReset: true,

    // Running browser mode via Node APIs can be flaky
    retry: 2,
  },
});
