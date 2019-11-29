// Requête à l'API sur les 4 derniers event ajouté
async function getLast4Events(){
	try {
		const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4`)
	
		const events = data.records.map(record => record.record)
	
		return events
	} catch {
		return null
	}
}

// Requête à l'API sur les 4 prochain events
async function get4NextEvents(){
	try {
		const data = await $.ajax(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=4&sort=-date_start`)
	
		const events = data.records.map(record => record.record)
	
		return events
	} catch {
		return null
	}
}

// Requête à l'API sur la recherche de la personne
async function getSearchedEvents(search){
	try {
		const url = 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?rows=20&sort=-date_start&search=' + search
	
		const data = await $.ajax(`${url}`)
	
		const events = data.records.map(record => record.record)
		return events
	} catch {
		return null
	}
}

// Requête à l'API sur la page event
async function getEvent(idEvent){
	try {
		const url = 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/' + idEvent
	
		const data = await $.ajax(`${url}`)
		
		const event = data.record
	
		return event
	} catch {
		return null
	}
}