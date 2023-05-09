import { promises as fs } from 'fs'

export async function signInIfNoCookies(page) {
  try {
    await readCookies(page)
  } catch {
    await signIn(page)
  }
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

async function readCookies(page) {
  console.log('reading coockies.json')
  const cookiesString = await fs.readFile('./cookies.json')
  const cookies = JSON.parse(cookiesString)
  await page.setCookie(...cookies)
  console.log('cookies.json read sucsesfull')
}
