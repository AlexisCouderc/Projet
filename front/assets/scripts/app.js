function createEventsCards(events, listName){
	events.forEach(recordsEvent => {
		const event = recordsEvent.fields
		const date = new Date(event.date_start)

		// Gestion de la longueur du titre
		let title = event.title
		if (title.length > 50){
			title = title.slice(0,50) + '...'
		}

		// Gestion de la longueur du chapo
		let chapo = event.lead_text
		if (chapo.length > 90){
			chapo = chapo.slice(0,90) + '... <b>Lire plus</b>'
		}

		// Modification de la class de l'élément à remplir 
		let listClass = '.cards-list'
		if(listName != '' || listName === undefined){
			listClass += listName
		}

		// Création de la card
		$(listClass).append(`
			<li id="${event.id}" class="event-card">
				<a href="event.html?${recordsEvent.id}">
					<div class="event-card-container-img">
						<div class="event-card-img">
						</div>
					</div>
					<div class="event-content-card">
						<h3 class="event-card-title">${title}</h3>
						<p class="event-card-date">${formatDate(date)}</p>
						<p class="event-card-chapo">${chapo}</p>
					</div>
				</a>
			</li>
		`)

		// Création des boutons en fonction de si ils sont en favoris ou non
		if(isFav(recordsEvent)){
			createButton(event.id, "follow")
		} else {
			createButton(event.id, "unfollow")
		}

		$("#" + event.id + " .event-card-img").css("background-image", "url(" + event.cover_url + ")")

		// création d'un Event au click
		$("#" + event.id + " .followbutton").click(() => {
			actionFav(recordsEvent)
		})
	})
}

// Création du bouton follow 
function createButton(eventId,srcFollow){
	$("#" + eventId).append(`
		<button type="button" class="followbutton" aria-label="button de follow">
			<img src="assets/img/${srcFollow}.svg" alt="Follow icon">
		</button>
	`)
}

// Ajout d'un "0" devant l'élément si "n" n'a qu'un chiffre
function pad(n) {
    return n<10 ? '0'+n : n;
}

// Formatage de la date reçu en "DD/MM/YYYY à HH:MM"
function formatDate(date) {
	const day = pad(date.getDate())
	const month = pad(date.getMonth()+1)
	const year = pad(date.getFullYear())
	const hour = pad(date.getHours())
	const min = pad(date.getMinutes())
	return day + '/' + month + '/' + year + ' à ' + hour + ':' + min
}

// Ajout ou suppression d'un événement du localStorage
function actionFav(event){
	if(isFav(event)){
		removeFav(event)
	 } else {
		addFav(event) 
	 } 
}

// Vérifie si l'événement exist dans le localStorage
function isFav(event){
	return this.parseEvent().find(storEvent => storEvent.id === event.id)
}

// Ajout d'une donnée dans le localStorage
function addFav(event) {
	const eventStored = this.parseEvent()
	eventStored.push(event)
	// Mise à jour du localStorage
	window.localStorage.setItem("favEvents", JSON.stringify(eventStored))
	$('#' + event.fields.id +" img").attr('src', 'assets/img/follow.svg')
}

// Suppression d'une donnée dans le localStorage
function removeFav(event) {
	const eventStored = this.parseEvent()
	const eventToRemove = eventStored.findIndex(storEvent => storEvent.id === event.id)
	eventStored.splice(eventToRemove, 1)
	// Mise à jour du localStorage	
	window.localStorage.setItem("favEvents", JSON.stringify(eventStored))
	$('#' + event.fields.id +" img").attr('src','assets/img/unfollow.svg')
}

// Récupération des données dans la localStorage
function parseEvent() {
	return JSON.parse(localStorage.getItem("favEvents")) || []
}

// Event au click pour l'animation du menu burger
function burgerMenu(){
	$(".burger-menu").click(() => {
		$(".burger-menu").toggleClass("show")
		$("nav ul").toggleClass("show")
	})
}

// Création des éléments de la page événement avec une condition pour chaque élément voulu
function pageEvent(recordsEvent){

	const event = recordsEvent.fields

	if(event.title){ $('.event-title').append(`${event.title}`)}

	// Left column
	if(event.cover_url){
		$('.event-img').css("background-image", "url(" + event.cover_url + ")")
		$('.banner-img').css("background-image", "url(" + event.cover_url + ")")
	}
	if(event.lead_text){$('.event-chapo').append(`${event.lead_text}`)}
	if(event.description){$('.event-desc').append(`${event.description}`)}
	
	if(event.tags){
		$('.left-column').append(`<h3>Tags :</h3><div class="event-tags"></div>`)
		event.tags.forEach(tag => {
			$('.event-tags').append(`<a href="eventList.html?${tag}">${tag}</a>`)
		});
	}
	// Right column
	$('.button-container').append(`
		<button id="${event.id}" type="button" class="followbutton" aria-label="button de follow">
			<img src="assets/img/unfollow.svg" alt="Follow icon">
			<span>Ajouter aux favoris</span>
		</button>
	`)
	if(event.date_description){
		$('.right-column .first-column').append(`<h3>Dates et horaires :</h3>
			<p>
				${event.date_description}
			</p>`
		)
	}

	if(event.price_detail){
		$('.right-column .first-column').append(`
			<h3>Prix :</h3>
			<p >
				${event.price_detail}
			</p>`
		)
	}
	if(event.address_city && event.address_name && event.address_street && event.address_zipcode){
		$('.right-column .first-column').append(`
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
		$('.right-column .first-column').append(`
			<h3>Adresse :</h3>
			<p>
				${event.transport}
			</p>`
		)
	}

	if(event.contact_facebook || event.contact_twitter || event.contact_mail || event.access_link || event.contact_mail || event.contact_phone) {
		$('.right-column .second-column').append(`
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

	$(".followbutton").click(() => {actionFav(recordsEvent)})

	if(isFav(recordsEvent)){
		$(".followbutton img").attr('src', 'assets/img/follow.svg')
	} else {
		$(".followbutton img").attr('src', 'assets/img/unfollow.svg')
	}
}

// création de la map avec pour paramètre la latitude, la longitude et l'adresse de l'événement
function createMap(lat, lon, address){
	const map = L.map('mapid').setView([lat, lon], 13)

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		accessToken: 'pk.eyJ1IjoiYWNvdWRlcmMiLCJhIjoiY2sza2NzZXIyMDFyaDNtdDVvOTJzZTVwNyJ9.FJohGaekQLCfCeRfJyKwfw'
	}).addTo(map)
	
	const marker = L.marker([lat, lon]).addTo(map)

	marker.bindPopup(address).openPopup();
	
}