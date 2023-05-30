import { writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';

export async function saveApplyVacancySuccsess(url) {
    const today = new Date().toLocaleString()
  try {
    const newVacancy = {url, today}
    const fileBuffer = await readFile('./applyVacancy.json')
    const fileText = String(fileBuffer)
    let vacancyList;
    if (fileText !== '') {
    vacancyList = JSON.parse(fileBuffer)
  } else {
    vacancyList = []
  }
    vacancyList.push(newVacancy)
    await writeFile(
      './applyVacancy.json',
      JSON.stringify(vacancyList, null, 2)
    )
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}
