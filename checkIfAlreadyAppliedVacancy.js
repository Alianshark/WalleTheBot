export async function checkIfAlreadyAppliedVacancy(page) {
  try{
    const replyButtonSelector = 'text/Відкрити діалог з'
    const signInButtonElement = await page.waitForSelector(replyButtonSelector, {
      timeout: 5_000,
    })
    return true
  } catch {
    return false
  }
}