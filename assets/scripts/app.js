function createEventsCards(events, listName){
	events.forEach(event => {
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
			<a href="index.html">
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
			<button type="button" class="followbutton unfollow" aria-label="button de follow">
				<img src="assets/img/unfollow.svg" alt="Follow icon">
			</button>
		</li>`);
		$("#" + event.id + " .event-card-img").css("background-image", "url(" + event.cover_url + ")")
	})
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