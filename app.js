import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const now = new Date();
  var options = {
    day: "numeric",
    month: "long",
  };
  const formatedToday = now.toLocaleDateString("uk-UA",options)
  const cookiesString = await fs.readFile('./cookies.json');
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies)
    //signIn()
  async function  signIn() {
    await page.goto('https://djinni.co/login?from=frontpage_main');

    await page.type('#email', process.env.email);
    await page.type('#password', process.env.password);

    const signInButtonSelector =  '.btn-primary';
    const signInButtonElement = await page.waitForSelector(signInButtonSelector);
    await page.click(signInButtonSelector);

    const cookies = await page.cookies();
    console.log(cookies)
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
  }

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
  const vacancyDateTrimmed = vacancyDate.trim()
  const isVacancyToday = vacancyDateTrimmed === 'сьогодні';

  if (!isVacancyToday) {
    console.log('Ne сьогоднішня ваканція')
    const vacancyLinkSelector =  '.profile';
    const vacansyLinkElement = await page.waitForSelector(vacancyLinkSelector);
    await page.click(vacancyLinkSelector);
    
    const replyButtonSelector =  '.btn-primary';
    const signInButtonElement = await page.waitForSelector(replyButtonSelector);
    await page.click(replyButtonSelector);
  }
  console.log('formatedToday', formatedToday)

  //await browser.close();

})();

