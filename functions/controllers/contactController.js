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
		return event.data.ref.set({
			filename: filename
		}, {merge:true});
	});

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
}