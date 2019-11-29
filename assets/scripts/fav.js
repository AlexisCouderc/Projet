$(function() {
	burgerMenu()

	// Création des cards avec les données dans le localStorage
	if(parseEvent().length > 0){
		createEventsCards(parseEvent(), '')
	} else {
		$('.content').append('<p class="empty">Vous n\'avez aucun événement ajouté à vos favoris</p>')
	}
})