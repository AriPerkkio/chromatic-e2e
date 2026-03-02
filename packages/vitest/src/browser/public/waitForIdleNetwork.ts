import { assert } from 'vitest';
import { commands } from 'vitest/browser';
import { getCurrentTest } from '../getCurrentTest';

/**
 * Wait for network to be idle, meaning no new network requests for at least `idleNetworkInterval` ms.
 *
 * The `idleNetworkInterval` can be configured via the Chromatic plugin's options.
 *
 * ```ts
 * export default defineConfig({
 *   plugins: [chromaticPlugin({ idleNetworkInterval: 50 })]
 * });
 * ```
 *
 * Use `timeout` argument to reject if network doesn't become idle within given time.
 */
export async function waitForIdleNetwork(timeout: number) {
  const test = getCurrentTest();

  assert(test, 'waitForIdleNetwork() must be called within a test()');
  assert(
    test.meta.__chromatic_isRegistered,
    "Cannot call waitForIdleNetwork for a test that hasn't been registered with the Chromatic plugin"
  );

  return await commands.__chromatic_waitForIdleNetwork(test.id, timeout);
}
