export async function replyToVacancy(page) {
  try {
    const replyButtonSelector = 'text/Відгукнутися на вакансію'
    const signInButtonElement = await page.waitForSelector(
      replyButtonSelector,
      {
        timeout: 5_000,
      }
    )
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

export async function clickOnFirstVacancy(page) {
  const vacancyLinkSelector = '.profile'
  const vacansyLinkElement = await page.waitForSelector(vacancyLinkSelector)
  await page.click(vacancyLinkSelector)
}
