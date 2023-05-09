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
      `Dear Hiring Manager,

      I hope this letter finds you well. My name is Ivan Andryevskiy and I am writing about the Javascript Developer role.
      
      I am very interested in this opportunity, and I  have finished many Javascript courses. So I am certain I can be useful to you.
      
      I have developed 10+ pet project, like:
      
      - Javascript arcade game with player flying plane, fire rockets into enemies
      
      - HTML5 implementation of the "words in a jar" game
      
      - Slot Machine
      
      - Bot to search and apply vacancy ( the one who writing you:)) 
      
      In my resume, you can find more information on the skills and qualifications I would bring to the table, such as:
      
      HTML5, css3, sass
      flex, grid, keyframes
      Javascript, React, es6 module
      JSON, API, telegrafJs, Sql, node.js express
      Game development, animation, web game performance
      Git, git bash
      
      
      I'd be happy to provide greater detail about my skills and experience during an interview. 
      Please call me at your earliest convenience.
      
      Sincerely,
      
      Ivan Andryevskiy`
    )

    const jobApplyButton = '#job_apply'
    const checkWorkButtonElement = await page.waitForSelector(jobApplyButton)
    await page.click(jobApplyButton)
  } catch (error) {
    console.log('Не вдалось відгукнутись на ваканцію. Error: ', error)
  }
}

export async function clickOnFirstVacancy(page) {
  const vacancyLinkSelector = '.profile'
  const vacansyLinkElement = await page.waitForSelector(vacancyLinkSelector)
  await page.click(vacancyLinkSelector)
}
