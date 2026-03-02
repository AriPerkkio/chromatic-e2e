import { beforeEach, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { waitForIdleNetwork } from './waitForIdleNetwork';
import { disableAutoSnapshot } from './autoSnapshot';

const worker = setupWorker();
disableAutoSnapshot();

beforeEach(async () => {
  await worker.start({ quiet: true });

  return function afterEach() {
    worker.resetHandlers();
    worker.stop();
  };
});

test('resolves when network is idle', async () => {
  // initial
  await waitForIdleNetwork(1000);

  // after request has resolved
  worker.use(http.get('/example', () => HttpResponse.json({ ok: true })));
  await fetch('/example');

  await expect(waitForIdleNetwork(1000)).resolves.toBeUndefined();
});

test('throws when network is not idle', async () => {
  const onRequest = withResolvers();
  worker.use(http.get('/example', () => new Promise(onRequest.resolve)));

  void fetch('/example').finally(() => expect.fail('Request should not complete'));
  await onRequest.promise;

  await expect(waitForIdleNetwork(100)).rejects.toThrowErrorMatchingInlineSnapshot(
    `[NetworkIdleTimeoutError: Timed out waiting for network to be idle]`
  );

  await expect(waitForIdleNetwork(100)).rejects.toThrowErrorMatchingInlineSnapshot(
    `[NetworkIdleTimeoutError: Timed out waiting for network to be idle]`
  );
});

test('resolves when network becomes idle', async () => {
  const onRequest = withResolvers();
  const onBlocked = withResolvers();

  worker.use(
    http.get('/example', async () => {
      onRequest.resolve();
      await onBlocked.promise;
      return HttpResponse.json({ ok: true });
    })
  );

  void fetch('/example');
  await onRequest.promise;

  await expect(waitForIdleNetwork(100)).rejects.toThrowErrorMatchingInlineSnapshot(
    `[NetworkIdleTimeoutError: Timed out waiting for network to be idle]`
  );

  onBlocked.resolve();

  await expect(waitForIdleNetwork(1000)).resolves.toBeUndefined();
});

function withResolvers() {
  let resolve = () => {};
  const promise = new Promise<void>((r) => (resolve = r));
  return { promise, resolve };
}
