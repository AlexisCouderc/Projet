(async function() {

	burgerMenu()
	
	let [lastEvents, nextEvent] = await Promise.all([getLast4Events(),get4NextEvents()]);

	//verification du bon fonctionnement de la requête ajax
	if(lastEvents && nextEvent) {
		$(".content").append(`
			<h2>Les derniers événements apparus :</h2>
			<ul class="cards-list last-event">
			</ul>
			<h2>Les prochains événements :</h2>
			<ul class="cards-list next-event">
			</ul>
		`)
	    createEventsCards(lastEvents, '.last-event')
    	createEventsCards(nextEvent, '.next-event')
	} else {
		$('.content').empty().append('<p>Un problème est malheureusement survenue lors du chargement des données</p>')
	}
})();

