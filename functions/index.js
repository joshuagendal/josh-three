const functions = require('firebase-functions');

// Firebase Admin SDK to access realtime DB
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

const contactController = require('./controllers/contactController');
const venueController = require('./controllers/venueController');
const eventController = require('./controllers/eventController');
// const songController = require('./controllers/songController');

module.exports = {
	// Create filename field for contact collection documents
	createContactFilenameField: contactController.createContactFilename,

	// Create cityState field for venue collection documents
	createCityStateFieldForVenue: venueController.createCityStateField,

	// Create filename field for venue collection documents
	createFilenameFieldForVenue: venueController.createFilenameForVenue,

	//Create filename field for event collection documents
	createFilenameFieldForEvent: eventController.createEventFilename,

	createFilenameFieldForSong: functions.firestore
		.document('songs/{songId}')
		.onWrite(event => {
			const songData = event.data.data();
			const songName = songData.songName;
			const filename = songName.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
			return event.data.ref.set({
				filename: filename
			}, {merge:true});
		})
	
	
}