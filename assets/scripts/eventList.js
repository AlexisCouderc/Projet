$(function(){

	$('.form-search').submit(function(event) {
		const search = $('.search').val()
	
		searchedEvent(search)
		event.preventDefault()
	})
})

async function searchedEvent(search) {

	const eventSearched = await Promise.resolve(getSearchedEvents(search));


	$('.cards-list').empty()

	if($('.empty')) {
		$('.empty').remove()
	}

	createEventsCards(eventSearched, "")

}