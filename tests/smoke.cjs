const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const fixtureDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'yosegakky-test-'));
  const imagePath = path.join(fixtureDirectory, 'image.png');
  fs.writeFileSync(imagePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64'));
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined
  });
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/^https?:\/\//, route => route.abort());
    await page.goto(pathToFileURL(path.resolve(__dirname, '../index.html')).href);
    assert.equal(await page.evaluate(() => jQuery.fn.jquery), '3.7.1');
    assert.equal(await page.evaluate(() => jQuery.fn.modal.Constructor.VERSION), '4.6.2');
    await page.evaluate(() => {
      jQuery('#header').empty();
      new Yosegakky.App({ title: 'Security smoke', overlay_fadeout_time: 0, interval_render_message: 0 })
        .render([{ userName: 'Smoke user', message: 'Hello<br>world' }]);
    });
    assert.equal(await page.locator('.card').count(), 1);
    assert.equal(await page.locator('.card .user-name').textContent(), 'Smoke user');
    await page.locator('.card-text a').click();
    await page.waitForFunction(() => document.documentElement.classList.contains('lightcase-open'));
    await page.waitForFunction(() => document.querySelector('.lightcase-inlineWrap')?.textContent.includes('Hello'));
    await page.evaluate(() => lightcase.close());
    await page.locator('#lightcase-case').waitFor({ state: 'hidden' });

    await page.evaluate(url => {
      const link = document.createElement('a');
      link.id = 'smoke-image';
      link.href = url;
      document.body.appendChild(link);
      jQuery(link).lightcase();
    }, pathToFileURL(imagePath).href);
    await page.locator('#smoke-image').evaluate(element => element.click());
    await page.waitForFunction(() => document.querySelector('#lightcase-content img')?.naturalWidth === 1);
    await page.evaluate(() => lightcase.close());
    await page.locator('#lightcase-case').waitFor({ state: 'hidden' });
    await page.locator('#lightcase-overlay').waitFor({ state: 'hidden' });
    assert.equal(await page.locator('#app').count(), 1);
    assert.equal(await page.locator('.card').count(), 1);
    assert.equal(await page.evaluate(() => {
      jQuery.extend(true, {}, JSON.parse('{"__proto__":{"securitySmoke":true}}'));
      return ({}).securitySmoke;
    }), undefined);
    fs.mkdirSync('test-results', { recursive: true });
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert(await page.locator('.card-body').evaluate(element => parseFloat(getComputedStyle(element).paddingTop) > 0));
      await page.screenshot({ path: `test-results/browser-${width}.png` });
    }
    assert.deepEqual(errors, []);
    console.log('PASS: offline startup, vendor versions, message render, inline/image lightbox, prototype pollution, mobile/desktop layout; no page errors');
  } finally {
    await browser.close();
    fs.rmSync(fixtureDirectory, { recursive: true, force: true });
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
