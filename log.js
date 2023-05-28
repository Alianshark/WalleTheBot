import { appendFile } from 'node:fs/promises';

export async function saveApplyVacancySuccsess(url) {
    const today = new Date().toLocaleString()
  try {
    await appendFile(
      './applyVacancy.txt',
      `\nApply vacancy:\n${url}\nDate:${today}\n `
    )
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}
