import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const now = new Date();
  var options = {
    day: "numeric",
    month: "long",
};
const formatedToday = now.toLocaleDateString("uk-UA",options)


await page.goto('https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript');

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
  const vacancyDateTrimmed = vacancyDate.trim()

  if (vacancyDateTrimmed === 'сьогодні') {
    console.log('сьогоднішня ваканція')
  }
  console.log('formatedToday', formatedToday)

  await browser.close();
})();

