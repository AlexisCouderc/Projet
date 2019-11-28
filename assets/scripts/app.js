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

			if(isFav(recordsEvent)){
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
				actionFav(recordsEvent)
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
	$('#' + event.fields.id +" img").attr('src', 'assets/img/follow.svg')
}

function removeFav(event) {
	const eventStored = this.parseEvent()
	const eventToRemove = eventStored.findIndex(storEvent => storEvent.id === event.id)
	eventStored.splice(eventToRemove, 1)
	window.localStorage.setItem("favEvents", JSON.stringify(eventStored))
	$('#' + event.fields.id +" img").attr('src','assets/img/unfollow.svg')
}

function parseEvent() {
	return JSON.parse(localStorage.getItem("favEvents")) || []
}

function pageEvent(recordsEvent){

	const event = recordsEvent.fields

	if(event.title){ $('.event-title').append(`${event.title}`)}

	// Left column
	if(event.cover_url){$('.event-img').css("background-image", "url(" + event.cover_url + ")")}
	if(event.lead_text){$('.event-chapo').append(`${event.lead_text}`)}
	if(event.description){$('.event-desc').append(`${event.description}`)}
	if(event.date_description){
		$('.right-column').append(`<h3>Dates et horaires :</h3>
			<p>
				${event.date_description}
			</p>`
		)
	}

	// Right column
	if(event.price_detail){
		$('.right-column').append(`
			<h3>Prix :</h3>
			<p >
				${event.price_detail}
			</p>`
		)
	}
	if(event.address_city && event.address_name && event.address_street && event.address_zipcode){
		$('.right-column').append(`
			<h3>Adresse :</h3>
			<p>
				${event.address_name}
				</br>
				${event.address_street}
				</br>
				${event.address_city} ${event.address_zipcode}
			</p>`
		)
	}
	if(event.transport){
		$('.right-column').append(`
			<h3>Adresse :</h3>
			<p>
				${event.transport}
			</p>`
		)
	}

	if(event.contact_facebook || event.contact_twitter || event.contact_mail || event.access_link || event.contact_mail || event.contact_phone) {
		$('.right-column').append(`
			<h3>Informations :</h3>
			<div class="info">
			</div>
		`)
		if(event.access_link) {
			$('.info').append(`
				<p><img src="assets/img/house.svg" alt="">: <a href="${event.access_link}">${event.access_link}</a></p>
			`)
		}
		if(event.contact_phone) {
			$('.info').append(`
				<p><img src="assets/img/smartphone.svg" alt="">: <a href="tel:${event.contact_phone}">${event.contact_phone}</a></p>
			`)
		}
		if(event.contact_mail) {
			$('.info').append(`
				<p><img src="assets/img/paper-plane.svg" alt="">: <a href="mailto:${event.contact_mail}">${event.contact_mail}</a></p>
			`)
		}
		if(event.contact_facebook) {
			$('.info').append(`
				<p><img src="assets/img/facebook.svg" alt="">: <a href="mailto:${event.contact_facebook}">Page Facebook</a></p>
			`)
		}
		if(event.contact_twitter) {
			$('.info').append(`
				<p><img src="assets/img/twitter.svg" alt="">: <a href="mailto:${event.contact_twitter}">Page Twitter</a></p>
			`)
		}
					
	}

	$(".followbutton").click(() => {actionFav(event)})

	if(isFav(recordsEvent)){
		$(".followbutton img").attr('src', 'assets/img/follow.svg')
	} else {
		$(".followbutton img").attr('src', 'assets/img/unfollow.svg')
	}

}
