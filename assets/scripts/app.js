function createEventsCards(events, listName){

	if(events.length > 0){
		events.forEach(recordsEvent => {
			const event = recordsEvent.fields
			const date = new Date(event.date_start)
			let chapo = event.lead_text
			if (chapo.length > 100){
				chapo = chapo.slice(0,100) + '... <b>Lire plus</b>'
			}

			let listClass = '.cards-list'

			if(listName != '' || listName === undefined){
				listClass += listName
			}

			$(listClass).append(`
			<li id="${event.id}" class="event-card">
				<a href="event.html?${recordsEvent.id}">
					<div class="event-card-container-img">
						<div class="event-card-img">
						</div>
					</div>
					<div class="event-content-card">
						<h3 class="event-card-title">${event.title}</h3>
						<p class="event-card-date">${formatDate(date)}</p>
						<p class="event-card-chapo">${chapo}</p>
					</div>
				</a>
			</li>`)

			if(isFav(event)){
				$("#" + event.id).append(`
					<button type="button" class="followbutton" aria-label="button de follow">
						<img src="assets/img/follow.svg" alt="Follow icon">
					</button>
				`)
			} else {
				$("#" + event.id).append(`
					<button type="button" class="followbutton" aria-label="button de follow">
						<img src="assets/img/unfollow.svg" alt="Follow icon">
					</button>
				`)
			}

			$("#" + event.id + " .event-card-img").css("background-image", "url(" + event.cover_url + ")")

			$("#" + event.id + " .followbutton").click(() => {
				actionFav(event)
			})
		})
	} else {
		$('.content').append('<p class="empty">Il n\'y a aucun événement pour cette recherche </p>')
	}
}

function pad(n) {
    return n<10 ? '0'+n : n;
}

function formatDate(date) {
	const day = pad(date.getDate())
	const month = pad(date.getMonth()+1)
	const year = pad(date.getFullYear())
	const hour = pad(date.getHours())
	const min = pad(date.getMinutes())
	return day + '/' + month + '/' + year + ' à ' + hour + ':' + min
}

function actionFav(event){
	if(isFav(event)){
		removeFav(event)
	 } else {
		addFav(event) 
	 } 
}

function isFav(event){
	return this.parseEvent().find(storEvent => storEvent.id === event.id)
}

function addFav(event) {
	const eventStored = this.parseEvent()
	eventStored.push(event)
	window.localStorage.setItem("favEvents", JSON.stringify(eventStored))
	$("#" + event.id + " .followbutton img").attr('src', 'assets/img/follow.svg')
}

function removeFav(event) {
	const eventStored = this.parseEvent()
	const eventToRemove = eventStored.findIndex(storEvent => storEvent.id === event.id)
	eventStored.splice(eventToRemove, 1)
	window.localStorage.setItem("favEvents", JSON.stringify(eventStored))
	$("#" + event.id + " .followbutton img").attr('src','assets/img/unfollow.svg')
}

function parseEvent() {
	return JSON.parse(localStorage.getItem("favEvents")) || []
}
