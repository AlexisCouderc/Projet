$(document).ready(function(){

	$('.form-search').submit(function(event) {
		const search = $('.search').val()
	
		searchedEvent(search)
		event.preventDefault()
	})
})

async function searchedEvent(search) {

	const [eventSearched] = await Promise.all([getSearchedEvents(search)]);


	$('.cards-list').empty()

	createEventsCards(eventSearched, "")

}