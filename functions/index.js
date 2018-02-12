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

	// updateEventsWithNewContactInfo: contactController.updateEventsWithNewContactInfo,

	// Create cityState field for venue collection documents
	createCityStateFieldForVenue: venueController.createCityStateField,

	// Create filename field for venue collection documents
	createFilenameFieldForVenue: venueController.createFilenameForVenue,

	//Create filename field for event collection documents
	createFilenameFieldForEvent: eventController.createEventFilename,

	trackFilename: functions.firestore
	.document('tracks/{trackId}')
	// We use 'e' here instead of 'event' as the callback so as to not confuse w/ event collection model
	.onWrite(e => {
		// first get contactId to use 
		const trackData = e.data.data();
		const eventId = trackData.event.id;
		const songId = trackData.song.id;
		const orderNum = trackData.orderNum;

		// declar a reference to the event and song documents w/ respective ID's 
		const eventRef = firestore.collection('events').doc(eventId);
		const songRef = firestore.collection('songs').doc(songId);

		// Promise function to get the contactRef data
		eventRef.get()
			.then(eventSnap => {
			const eventData = eventSnap.data();
			const eventFilename = eventData.filename;
			return songRef.get().then(songSnap => {
				const songData = songSnap.data();
				const songFilename = songData.filename;
				const songName = songData.songName;
				return e.data.ref.set({
					eventFilename: eventFilename,
					eventId: eventId,
					songFilename: songFilename,
					songName: songName,
					songId: songId
				}, {merge:true}); 
			})
		}).catch(err => {
			console.log(err);
		});
	}),

	
	createFilenameFieldForSong: functions.firestore
		.document('songs/{songId}')
		.onWrite(event => {
			const songData = event.data.data();
			const songName = songData.songName;
			const filename = songName.toLowerCase().replace(/[^A-Za-z0-9]/g, '');

			// const contactId = songData.contact.id;

			// query contact field and grab contact.name
			

			return event.data.ref.set({
				filename: filename,
			}, {merge:true});
		}),

	// add contact name field to contacts collection
	createContactNameFieldForSong: functions.firestore
		.document('songs/{songId}')
		.onWrite(event => {
			// first get contactId to use 
			const songData = event.data.data();
			const composerId = songData.composer.id;

			// declar a reference to the contact document 
			const contactRef = firestore.collection('contacts').doc(composerId);

			// Promise function to get the contactRef data

				return event.data.ref.set({
					composerName: contactName,
					composerId: composerId
				}, {merge:true})
			})


	}
				// return event.data.ref.set({
				// 	composerName: contactName,
				// 	composerId: contactId
				// }, {merge:true})
		// 	}).catch(err => {
		// 		console.log`ERROR: ${err}`;
		// 	})
		// })
		// 		return event.data.ref.set({
		// 			composerName: contactName,
		// 			composerId: contactId
		// 		}, {merge:true})
		// 	}).catch(err => {
		// 		console.log`ERROR: ${err}`;
		// 	})
		// })
	
	
	
		// contactRef.get()
		// .then(snap => {
		// const contactData = snap.data();
		// const contactName = contactData.name;