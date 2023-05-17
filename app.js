import puppeteer from 'puppeteer'
import { checkIfAlreadyAppliedVacancy } from './checkIfAlreadyAppliedVacancy.js'
import { signInIfNoCookies } from './signIn.js'
import { filterUrls } from './filter.js'
import { replyToVacancy, clickOnFirstVacancy } from './vacancy.js'
import { randomDelay } from './delay.js'
import 'dotenv/config'

async function runBot(url) {
  console.log(`--- Hello to you, I'am a runBot Function ---`)
  console.log(`url: ${url}`)
  const browser = await puppeteer.launch({ headless: 'new' })
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
  console.log(`send resume on the vacancy: `, !allreadyAppliedToVacancy)
  if (!allreadyAppliedToVacancy) {
    await replyToVacancy(page)
  }

  await browser.close()
}

async function runBotForEachUrl() {
  console.log('[run Bot for Each url]')
  for (const url of filterUrls) {
    try{
    await runBot(url)
    } catch (error) {
      console.log('** Error, but continue. Date:', new Date().toLocaleString(), '. See error.log **')
      console.error('Error. Date', new Date().toLocaleString())
      console.error('Url: ', url)
      console.error(error + '\n')
    }
    await randomDelay(30_000)
    console.log('\n')
  }
  console.log('pausing before running new loop')
  await randomDelay(100_000)
  console.log('[End loop]\n')
  await runBotForEachUrl()
}
runBotForEachUrl()
