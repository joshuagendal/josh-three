const functions = require('firebase-functions');
const admin = require('firebase-admin');
// app is initialized in index.js file so no need to in controllers
var firestore = admin.firestore();

// function to create filename for event collection docs
// filename format: YYYYMMDD_contact_venue
let createEventFilename = functions.firestore
	.document('events/{eventId}')
	.onWrite(event => {
		// First, declare variables
		// contactId and eventId will be used to query those associated documents
		var eventData = event.data.data();
		var contactId = eventData.contact.id;
		var venueId = eventData.venue.id;
		var eventDate = eventData.eventDate;

		// format date
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
			const contactName = contactData.name;
			const contactFilename = contactData.filename;
			// promise function to get venue name
			return venueRef.get().then(snap => {
				const venueData = snap.data();
				const venueName = venueData.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
				return event.data.ref.set({
					filename: `${dateYYYYMMDD}_${contactName}_${venueName}`,
					venueName: venueName,
					contactName: contactName,
					contactId: contactId,
					venueId: venueId
				}, {merge:true});
			});
		}).catch(err => {
			console.log(err);
		})
	});





module.exports = {
	createEventFilename
}