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
			const contactId = songData.composer.id;
			console.log(`CONTACT ID: ${contactId}`);

			// declar a reference to the contact document 
			const contactRef = firestore.collection('contacts').doc(contactId);

			// Promise function to get the contactRef data
			contactRef.get()
				.then(snap => {
				const contactData = snap.data();
				const contactName = contactData.name;
				return event.data.ref.set({
					composerName: contactName,
					composerId: contactId
				}, {merge:true})
			}).catch(err => {
				console.log(err);
			});
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
	
	
	
