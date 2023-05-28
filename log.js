import { appendFile } from 'node:fs/promises';

export async function saveApplyVacancySuccsess(url) {
  try {
    await appendFile(
      './applyVacancy.txt',
      `SUCCESSFULLY CLICK ON JOB APPLY BUTTON, \n ${url} \n`
    )
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}
