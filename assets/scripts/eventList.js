

(async function() {

	$('search-valid').addEventListener('click'){
		$('.cards-list').innerHTML = ''
		
		const [lastEvents] = await Promise.all([getLastEvents()]);
	
		createEventsCards(lastEvents)
	}

})();
