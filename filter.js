export async function goToVacancyWithFilter(page) {
    await page.goto(
      'https://djinni.co/jobs/?location=kyiv&region=UKR&primary_keyword=JavaScript&exp_level=no_exp'
    )
  }