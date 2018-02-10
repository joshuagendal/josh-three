const functions = require('firebase-functions');

// Firebase Admin SDK to access realtime DB
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

// Create COntact filename 
let createContactFields = functions.firestore
	.document('contacts/{contactId}')
	.onWrite(event => {
		var newData = event.data.data();
		var name = newData.name;
		var filename = name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
		// add console.log statement
		return event.data.ref.set({
			filename: filename
		}, {merge:true});
	});

// Create cityState field for venue
let createCityStateField = functions.firestore
	.document('venues/{venueId}')
	.onWrite(event => {
		var venueData = event.data.data();
		var venueCity = venueData.city;
		var venueState = venueData.state;
		// add console.log statement
		return event.data.ref.set({
			cityState: `${venueCity}, ${venueState}`
		}, {merge: true});
	});

	// Create filename for venue
let createFilenameForVenue = functions.firestore
	.document('venues/{venueId}')
	.onWrite(event => {
		var venueData = event.data.data();
		var venueName = venueData.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
		var venueCity = venueData.city.toLowerCase();
		// add console.log statement
		console.log
		return event.data.ref.set({
			filename: `${venueName}_${venueCity}`
		}, {merge:true});
	});

// Create id in this format: yyyymmdd_contact_venue
// let createEventId = functions.firestore
// 	.document('events/{eventId}')
// 	.onWrite(event => {
// 		var eventData = event.data.data();
// 		var eventContact = eventData.contact;
// 		var event
// 	});

module.exports = {
	createContactFields,
	createCityStateField,
	createFilenameForVenue
}