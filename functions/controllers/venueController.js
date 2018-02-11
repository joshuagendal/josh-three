const functions = require('firebase-functions');
const admin = require('firebase-admin');
// app is initialized in index.js file so no need to in controllers
var firestore = admin.firestore();

let createCityStateField = functions.firestore
	.document('venues/{venueId}')
	.onWrite(event => {
		var venueData = event.data.data();
		var venueCity = venueData.city;
		var venueState = venueData.state;
		return event.data.ref.set({
			cityState: `${venueCity}, ${venueState}`
		}, {merge: true});
	});

let createFilenameForVenue = functions.firestore
	.document('venues/{venueId}')
	.onWrite(event => {
		var venueData = event.data.data();
		var venueName = venueData.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
		var venueCity = venueData.city.toLowerCase();
		return event.data.ref.set({
			filename: `${venueName}_${venueCity}`
		}, {merge:true});
	});





module.exports = {
	createCityStateField,
	createFilenameForVenue
}
