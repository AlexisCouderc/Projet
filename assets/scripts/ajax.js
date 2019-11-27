async function getLast4Events(){
	const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4`);

	const events = data.records.map(record => record.record.fields)

	return events
}

async function get4NextEvents(){
	const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4&sort=-date_start`);

	const events = data.records.map(record => record.record.fields)

	return events
}

async function getSearchedEvents(tag){
	const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4&sort=-date_start`);

	const events = data.records.map(record => record.record.fields)

	return events
}