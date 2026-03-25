import { defineProject } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { chromaticPlugin } from './src/node/plugin';

export default defineProject({
  plugins: [chromaticPlugin()],

  // To always catch errors that happen on first test run
  optimizeDeps: { force: true },

  test: {
    name: { label: 'Vitest Browser', color: 'yellow' },
    include: ['src/**/*.browser.test.ts'],
    setupFiles: ['test/utils/setup.ts'],

    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },

    provide: {
      processCwd: process.cwd(),
    },
  },
});

declare module 'vitest' {
  export interface ProvidedContext {
    processCwd: string;
    testName?: string;
    disableAutoSnapshot: 'module' | 'describe' | 'describe-nested' | 'test' | 'test-second';
  }
}
