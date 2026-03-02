import { defineProject } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { chromaticPlugin } from './src/node/plugin';
import { stores } from './src/node/commands';

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

      commands: {
        getSnapshots(_, id: string) {
          return Object.fromEntries(stores.snapshots.get(id) || []);
        },
      },
    },

    provide: {
      processCwd: process.cwd(),
    },
  },
});

declare module 'vitest' {
  export interface ProvidedContext {
    processCwd: string;
    disableAutoSnapshot: 'module' | 'describe' | 'describe-nested' | 'test' | 'test-second';
  }
}

declare module 'vitest/browser' {
  interface BrowserCommands {
    getSnapshots(id: string): Promise<Record<string, unknown>>;
  }
}
