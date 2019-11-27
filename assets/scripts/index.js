(async function() {
    const [lastEvents, nextEvent] = await Promise.all([getLast4Events(),get4NextEvents()]);

    createEventsCards(lastEvents, '.last-event')
    createEventsCards(nextEvent, '.next-event')

})();

