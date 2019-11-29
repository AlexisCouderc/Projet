(async function() {
	burgerMenu()
	const idEvent = window.location.search.slice(1)
	const event = await Promise.resolve(getEvent(idEvent));

	//verification du bon fonctionnement de la requête ajax
	if (event) {
		pageEvent(event)
		const lat = event.fields.lat_lon.lat
		const lon = event.fields.lat_lon.lon
		const address = event.fields.address_name + "</br>" + event.fields.address_street
		createMap(lat,lon, address)
	} else {
		$('.content').empty().append('<p>Un problème est malheureusement survenue lors du chargement des données</p>')
	}
})();
