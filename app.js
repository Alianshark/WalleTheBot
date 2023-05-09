import puppeteer from 'puppeteer'
import { checkIfAlreadyAppliedVacancy} from './checkIfAlreadyAppliedVacancy.js'
import { signInIfNoCookies } from './signIn.js'

async function runBot() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

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



async function replyToVacancy(page) {
  try {
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
  } catch {
    console.log('Не вдалось відгукнутись на ваканцію. Error: ', error)
  }
}


async function goToVacancyWithFilter(page) {
  await page.goto(
    'https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript&exp_level=no_exp'
  )
}

async function clickOnFirstVacancy(page) {
  const vacancyLinkSelector = '.profile'
  const vacansyLinkElement = await page.waitForSelector(vacancyLinkSelector)
  await page.click(vacancyLinkSelector)
}

runBot()
