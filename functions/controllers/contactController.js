const functions = require('firebase-functions');
const admin = require('firebase-admin');
// app is initialized in index.js file so no need to in controllers
var firestore = admin.firestore();

let createContactFilename = functions.firestore
	.document('contacts/{contactId}')
	.onWrite(event => {
		var newData = event.data.data();
		var name = newData.name;
		var filename = name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
		return event.data.ref.set({
			filename: filename
		}, {merge:true});
	});

module.exports = {
	createContactFilename
}