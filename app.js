import puppeteer from 'puppeteer'
import { checkIfAlreadyAppliedVacancy } from './checkIfAlreadyAppliedVacancy.js'
import { signInIfNoCookies } from './signIn.js'
import { goToVacancyWithFilter } from './filter.js'
import { replyToVacancy, clickOnFirstVacancy } from './vacancy.js'
import 'dotenv/config'

async function runBot() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const today = new Date()
  console.log('\n')
  console.log(today.toLocaleString())

  await page.setViewport({ width: 1080, height: 1024 })

  await signInIfNoCookies(page)
  const newSerchFilter = [
    'https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript&exp_level=no_exp',
    'https://djinni.co/jobs/?location=kyiv&region=UKR&keywords=react&all-keywords=&any-of-keywords=&exclude-keywords=&exp_level=no_exp',
  ]

  console.log(newSerchFilter)
  newSerchFilter.forEach(gotoPage)
  async function gotoPage(url) {
    await page.goto(url)
  }
  await clickOnFirstVacancy(page)

  const allreadyAppliedToVacancy = await checkIfAlreadyAppliedVacancy(page)
  if (allreadyAppliedToVacancy) {
    console.log('Already reply on vacancy')
  } else {
    await replyToVacancy(page)
  }

  await browser.close()
  setTimeout(runBot, 20_000)
}

runBot()
