import puppeteer from 'puppeteer'
import { promises as fs } from 'fs'
async function runBot() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await signInIfNoCookies(page)
  await goToVacancyWithFilter(page)

  await page.setViewport({ width: 1080, height: 1024 })

  const vacancyLinkSelector = '.profile'
  const vacansyLinkElement = await page.waitForSelector(vacancyLinkSelector)
  await page.click(vacancyLinkSelector)

  try {
    await replyToVacancy(page)
  } catch (error) {
    console.log('Не вдалось відгукнутись на ваканцію. Error: ', error)
  }

  console.log('formatedToday', formatedToday)
  await browser.close()
}

async function signIn(page) {
  await page.goto('https://djinni.co/login?from=frontpage_main')

  if (process.env.email == undefined) {
    console.log('Empty email aborting. Use source .env')
    return false
  } else {
    console.log('using email ', process.env.email)
  }
  await page.type('#email', process.env.email)
  await page.type('#password', process.env.password)

  const signInButtonSelector = '.btn-primary'
  const signInButtonElement = await page.waitForSelector(signInButtonSelector)
  await page.click(signInButtonSelector)

  const cookies = await page.cookies()

  await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2))
  return true
}

async function replyToVacancy(page) {
  const replyButtonSelector = 'text/Відгукнутися на вакансію'
  const signInButtonElement = await page.waitForSelector(replyButtonSelector, {
    timeout: 5_000,
  })
  await page.click(replyButtonSelector)

  await page.type(
    '#message',
    'Hello I am Wall-E, bot who search vacancies. I am glad to write you. My author is looking for job'
  )

  const jobApplyButton = '#job_apply'
  const checkWorkButtonElement = await page.waitForSelector(jobApplyButton)
  await page.click(jobApplyButton)
}

async function signInIfNoCookies(page) {
  try {
    await readCookies(page)
  } catch {
    await signIn(page)
  }
}

async function readCookies(page) {
  console.log('reading coockies.json')
  const cookiesString = await fs.readFile('./cookies.json')
  const cookies = JSON.parse(cookiesString)
  await page.setCookie(...cookies)
  console.log('cookies.json read sucsesfull')
}

async function goToVacancyWithFilter(page) {
  await page.goto(
    'https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript&exp_level=no_exp'
  )
}

runBot()
