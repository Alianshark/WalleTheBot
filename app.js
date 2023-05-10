import puppeteer from 'puppeteer'
import { checkIfAlreadyAppliedVacancy } from './checkIfAlreadyAppliedVacancy.js'
import { signInIfNoCookies } from './signIn.js'
import { filterUrls } from './filter.js'
import { replyToVacancy, clickOnFirstVacancy } from './vacancy.js'
import { delay } from './delay.js'
import 'dotenv/config'

async function runBot(url) {
  console.log(`--- Hello to you, I'am a runBot Function ---`)
  console.log(`url: ${url}`)
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const today = new Date()
  console.log('Date of bot run:', today.toLocaleString())

  await page.setViewport({ width: 1080, height: 1024 })

  await signInIfNoCookies(page)
  console.log(`Successfull signIn or using cookies`)

  await page.goto(url)
  console.log(`successfully opened url: ${url}`)

  await clickOnFirstVacancy(page)
  console.log(`successfull click vacancy`)

  const allreadyAppliedToVacancy = await checkIfAlreadyAppliedVacancy(page)
  console.log(`already apply to vacancy: `, allreadyAppliedToVacancy)
  if (!allreadyAppliedToVacancy) {
    await replyToVacancy(page)
  }

  await browser.close()

  setTimeout(runBotForEachUrl, 60_000)
}



async function runBotForEachUrl() {
  for (const url of filterUrls) {
    await runBot(url)
    await delay(20_000);
    console.log('')
  }
}
runBotForEachUrl()
