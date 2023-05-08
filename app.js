import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://developer.chrome.com/');

  await page.setViewport({width: 1080, height: 1024});



  console.log('Close Browser');

  await browser.close();
})();

