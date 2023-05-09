import puppeteer from 'puppeteer'
import { checkIfAlreadyAppliedVacancy } from './checkIfAlreadyAppliedVacancy.js'
import { signInIfNoCookies } from './signIn.js'
import { goToVacancyWithFilter } from './filter.js'
import { replyToVacancy, clickOnFirstVacancy } from './vacancy.js'
import 'dotenv/config'

async function runBot() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  const today = new Date()
  console.log('\n')
  console.log(today.toLocaleString())

  await page.setViewport({ width: 1080, height: 1024 })

  await signInIfNoCookies(page)
  await goToVacancyWithFilter(page)
  await clickOnFirstVacancy(page)

  const allreadyAppliedToVacancy = await checkIfAlreadyAppliedVacancy(page)
  if (allreadyAppliedToVacancy) {
    console.log('Already reply on vacancy')
  } else {
    await replyToVacancy(page)
  }

  await browser.close()
}

runBot()
