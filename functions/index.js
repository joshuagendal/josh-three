const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Firebase Admin SDK to access realtime DB
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

exports.createContactFields = functions.firestore
	.document('contacts/{contactId}')
	.onWrite(event => {
		var newData = event.data.data();
		var name = newData.name;
		var filename = name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
		return event.data.ref.set({
			filename: filename
		}, {merge:true});
	});