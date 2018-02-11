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
		return event.data.ref.set({
			filename: `${venueName}_${venueCity}`
		}, {merge:true});
	});

// Create id in this format: yyyymmdd_contact_venue
let createEventFilename = functions.firestore
	.document('events/{eventId}')
	.onWrite(event => {
		var eventData = event.data.data();
		var contactId = eventData.contact.id;
		var venueId = eventData.venue.id;
		var eventDate = eventData.eventDate;

		var d = new Date(eventDate)
		var month = `${d.getMonth() + 1}`;
		var	day = `${d.getDate()}`;
		var year = `${d.getFullYear()}`;
		if (month.length < 2) {
			month = '0' + month;
		}
		if (day.length < 2) {
			day = '0' + day;
		}
		const dateYYYYMMDD = year+month+day;

		// These are references to the documents needed, found by Id
		var contactRef = firestore.collection('contacts').doc(contactId);
		var venueRef = firestore.collection('venues').doc(venueId);
		// promise function to get contact name 
		contactRef.get().then(snap => {
			const contactData = snap.data();
			const contactName = contactData.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
			// promise function to get venue name
			return venueRef.get().then(snap => {
				const venueData = snap.data();
				const venueName = venueData.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
				return event.data.ref.set({
					filename: `${dateYYYYMMDD}_${contactName}_${venueName}`,
					venueName: venueName
				}, {merge:true});
			});
		}).catch(err => {
			console.log(err);
		})
	});




		// var eventContact = eventData.contact.name;
		// var eventVenue = eventData.venue.name;	
		// var eventDate = eventData.eventDate;
		// console.log(`PARAMS: ${event.params}`);
		// console.log('Contact: ', eventContact, 'extra: ', extra);
		// console.log(`CONTACTID: ${contactId}`);
		// console.log(`Creating ID for ${eventVenue} on ${eventDate} and contact is ${eventContact}`);
	

module.exports = {
	createContactFields,
	createCityStateField,
	createFilenameForVenue,
	createEventFilename
}