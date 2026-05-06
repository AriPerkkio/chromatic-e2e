import { test, expect, takeSnapshot } from '../src';

const URL =
  'https://ariperkkio.github.io/vite-plugin-source-map-visualizer/#NTEAZXhwb3J0IGZ1bmN0aW9uIEZpcnN0KGlucHV0KSB7CiAgcmV0dXJuICJGaXJzdCI7Cn0KMzAzAHsidmVyc2lvbiI6Mywic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29yay92aXRlLXBsdWdpbi1zb3VyY2UtbWFwLXZpc3VhbGl6ZXIvdml0ZS1wbHVnaW4tc291cmNlLW1hcC12aXN1YWxpemVyL3Rlc3QvZml4dHVyZXMvZmlyc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIEZpcnN0KGlucHV0OiBib29sZWFuIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFwiRmlyc3RcIjtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQU8sZ0JBQVMsTUFBTSxPQUFpQztBQUNyRCxTQUFPO0FBQ1Q7IiwibmFtZXMiOltdfQ==';

test('pages iframes', async ({ page }, testInfo) => {
  await page.goto(URL);

  await takeSnapshot(page, 'iframes', testInfo);
});
