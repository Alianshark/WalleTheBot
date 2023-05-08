import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript&exp_level=no_exp');

  await page.setViewport({width: 1080, height: 1024});

  const vacancyDateSelector = '.text-date';
  const element = await page.waitForSelector(vacancyDateSelector);
  
  const vacancyDate = await element?.evaluate(el => {
    return getFirstNetxNode(el)
    function getFirstNetxNode(el) {
      let iter = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
      let textnode;

      while (textnode = iter.nextNode()) {
          return (textnode.textContent)
      }
    }
  });

  console.log(vacancyDate.trim())

  await browser.close();
})();

