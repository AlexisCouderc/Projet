$(function(){
	burgerMenu()

	// Vérification si on vient de la page d'un événement via les tags
	const tagSearch = window.location.search.slice(1)
	if(tagSearch){
		searchedEvent(tagSearch);
	}

	// Au submit fait un appel à l'api via la fonction searchedEvent en fonction de la valeur taper
	$('.form-search').submit(function(event) {
		const search = $('.search').val()
		searchedEvent(search)
		event.preventDefault()
	})
})

async function searchedEvent(search) {

	const eventSearched = await Promise.resolve(getSearchedEvents(search));

	//verification du bon fonctionnement de la requête ajax
	if (eventSearched){
		if(eventSearched.length > 0){
			if($(".content h2")){
				$(".content").append(`
					<h2>Résultat de votre recherche :</h2>
					<ul class="cards-list"></ul>
				`)
			}
			// Vide la liste précédente
			$('.cards-list').empty()

			// Supprime la phrase comme quoi il n'y a aucun résultat
			if($('.empty')) {
				$('.empty').remove()
			}
		
			createEventsCards(eventSearched, "")
		} else {
			$('.content').append('<p class="empty">Il n\'y a aucun événement pour cette recherche </p>')
		}
	} else {
		$('.content').empty().append('<p>Un problème est malheureusement survenue lors du chargement des données</p>')
	}

}

