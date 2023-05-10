import puppeteer from 'puppeteer'
import { checkIfAlreadyAppliedVacancy } from './checkIfAlreadyAppliedVacancy.js'
import { signInIfNoCookies } from './signIn.js'
import { goToVacancyWithFilter } from './filter.js'
import { replyToVacancy, clickOnFirstVacancy } from './vacancy.js'
import 'dotenv/config'

async function runBot(url) {
  console.log(`--- Hello to you, I'am a runBot Function ---`)
  console.log(`url: ${url}`)
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  const today = new Date()
  console.log('Date of bot run:', today.toLocaleString())

  await page.setViewport({ width: 1080, height: 1024 })
  /*
  
  await signInIfNoCookies(page)
  
  await page.goto(url)
  
  await clickOnFirstVacancy(page)
  
  const allreadyAppliedToVacancy = await checkIfAlreadyAppliedVacancy(page)
  if (allreadyAppliedToVacancy) {
    console.log('Already reply on vacancy')
  } else {
    await replyToVacancy(page)
  }
  */
  await browser.close()

  //setTimeout(runBotForEachUrl, 20_000)
}

const urls = [
  'https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript&exp_level=no_exp',
  'https://djinni.co/jobs/?location=kyiv&region=UKR&keywords=react&all-keywords=&any-of-keywords=&exclude-keywords=&exp_level=no_exp',
]

async function runBotForEachUrl() {
  for (const url of urls) {
    await runBot(url)
    console.log('')
  }
}
runBotForEachUrl()
