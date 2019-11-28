(async function() {
	const idEvent = window.location.search.slice(1)
	const event = await Promise.resolve(getEvent(idEvent));
	
	pageEvent(event)

})();
