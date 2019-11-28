async function getLast4Events(){
	const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4`)

	const events = data.records.map(record => record.record)

	return events
}

async function get4NextEvents(){
	const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4&sort=-date_start`)

	const events = data.records.map(record => record.record)

	return events
}

async function getSearchedEvents(search){

	const url = 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=20&search=' + search

	const data = await $.ajax(`${url}`)

	const events = data.records.map(record => record.record)
	return events
}

async function getEvent(idEvent){

	const url = 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/' + idEvent

	const data = await $.ajax(`${url}`)
	
	const event = data.record

	return event
}