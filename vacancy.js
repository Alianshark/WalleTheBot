import { message } from "./message.js"
export async function replyToVacancy(page) {
  try {
    console.log(`try to reply vacancy`)
    const replyButtonSelector = '.js-inbox-toggle-reply-form'
    const signInButtonElement = await page.waitForSelector(
      replyButtonSelector,
      {
        timeout: 5_000,
      }
    )
    console.log(`found signIn button`, signInButtonElement)
    await page.click(replyButtonSelector)
    console.log(`successfully click on reply button`)

    await page.type('#message', message)
    console.log(`successfully type in text on vacancy page`)
    
    const jobApplyButton = '#job_apply'
    const checkWorkButtonElement = await page.waitForSelector(jobApplyButton)
    await page.click(jobApplyButton)
    console.log(`SUCCESSFULLY CLICK ON JOB APPLY BUTTON`)

  } catch (error) {
    console.log('Не вдалось відгукнутись на ваканцію. Error: ', error)
  }
}

export async function clickOnFirstVacancy(page) {
  const vacancyLinkSelector = '.profile'
  const vacansyLinkElement = await page.waitForSelector(vacancyLinkSelector)
  await page.click(vacancyLinkSelector)
}
