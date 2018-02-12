const functions = require('firebase-functions');
const admin = require('firebase-admin');
// app is initialized in index.js file so no need to in controllers
var firestore = admin.firestore();

let createContactFilename = functions.firestore
	.document('contacts/{contactId}')
	.onWrite(event => {
		const newData = event.data.data();
		const name = newData.name;
		const filename = name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');

		const contactId = event.params.contactId;
		const eventRef = firestore.collection('events');
		const songRef = firestore.collection('songs');

		return event.data.ref.set({
			filename: filename
		}, {merge:true}).then(
			// Query all event documents with contactId supplied
			eventRef.where('contactId', '==', contactId).get()
				.then(eventSnap => {
					// loop through snapshot of the data, document by document
					eventSnap.forEach(eventDoc => {
						// set contact Name to '...updating' which will trigger event function controller
						return eventDoc.ref.set({
							contactName: 'updating...'
						}, {merge:true})
					});
					return eventSnap;
				// query all song docs w/ songId === composer Id
				}).catch(err => {
						console.log(`ERROR!: ${err}`);
				}));
			});





			// .then(songRef.where('composerId', '==', contactId).get()
			// 		.then(songSnap => {
			// 			songSnap.forEach(songDoc => {
			// 				return songDoc.ref.set({
			// 					composerName: 'updating...'
			// 				});	
			// 			});
			// 			return songSnap;	
			// 		}))
			// .then(songRef.where('composerId', '==', contactId).get()
			// .then(songSnap => {
			// 	songSnap.forEach(songDoc => {
			// 		return songDoc.ref.set({
			// 			composerName: 'updating...'
			// 		});	
			// 	});
			// 	return songSnap;	
			// }))

// let updateEventsWithNewContactInfo = functions.firestore
// 	.document('contacts/{contactId}')
// 	.onWrite(event => {
// 		const newData = event.data.data();
// 		// const name = newData.name;
// 		// const filename = name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');

// 		const contactId = event.params.contactId;
// 		const eventRef = firestore.collection('events');

// 		const query = eventRef.where('contactId', '==', contactId).get()
// 			.then(snap => {
// 				snap.forEach(doc => {
// 					return doc.ref.set({
// 						contactName: '...updating'
// 					}, {merge:true})
// 				});
// 				return snap;
// 			}).catch(err => {
// 				console.log(err);
// 			})
// 		});
		
		
		// .then( 
		// 	eventRef.where('contactId', '==', contactId).get()
		// 		.then(snap => {
		// 			snap.forEach(doc => {
		// 				doc.ref.set({
		// 					contactName: '...updating'
		// 				}, {merge:true})
		// 			})
		// 		})).catch(err => {
		// 	console.log(err);
		// })

		// const query = eventRef.where('contactId', '==', contactId).get()
		// 	.then(snap => {
		// 		snap.forEach(doc => {
		// 			doc.ref.set({
		// 				contactName: '...updating'
		// 			}, {merge:true});
		// 		});
		// 	}).catch(err => {
		// 		console.log(`Error ${err}`);
		// 	})
		// updatRefArtistField


// let updateArtistRefFields = functions.firestore
// 	.document('contacts/{contactId')
// 	.onUpdate(event => {
// 		const contactData = event.data.data();
// 		const contactName = contactData.name;
// 		console.log(`Getting data from contact: ${contactName}`);

// 		const newFilename = contactName.toLowerCase().replace(/[^A-Za-z0-9]/g, '');

// 		// collections and fields that depend on contact name:
// 		// events.filename, events.contactName, 
// 	});

module.exports = {
	createContactFilename
	// updateEventsWithNewContactInfo
}