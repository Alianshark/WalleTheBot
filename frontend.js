async function run() {
    const url = 'applyVacancy.json'
    const response = await fetch(url)
    const vacancies = await response.json()
    console.log(vacancies)
    const list = document.createElement('div')
    vacancies.forEach(ShowVacancy);
    
    function ShowVacancy(vacancy) {
        const listItem = createListItem(vacancy)
        list.append(listItem)
    }
    document.body.append(list)
}

function createListItem(vacancy) {
    const vacancyDivItem =  document.createElement('div')
    vacancyDivItem.innerHTML = vacancy.url + '<div>' + vacancy.today + '</div>'
    return vacancyDivItem
}



run()