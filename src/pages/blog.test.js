// eslint-disable-next-line import/no-extraneous-dependencies
const puppeteer = require('puppeteer');
// eslint-disable-next-line import/no-extraneous-dependencies
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Screenshot testing', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test('blog page should match screenshot', async () => {
    await page.goto('http://localhost:3000/blog.html');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
