import * as firebase from 'firebase';
require("firebase/firestore");

var collectionMeta={
	"contacts": {
		"fields": {
			"name": "Contact Name",
			"type": "type",
			"filename": "filename"
		},
		"collections": []
	},
	"venues": {
		"fields": {
			"name": "Venue Name",
			"venueType": "Venue Type",
			"city": "City",
			"state": "State",
			"cityState": "Google Cloud Function",
			"filename": "filename - Google Cloud Function",
		},
		"collections": []
	},
	"events": {
		"fields": {
			"eventType": "Event Type",
			"filename": "filename",
			"eventDate": "Date",
			"identifier": "Unique ID name",
			"contact": "Events Contact",
			"contactId": "Contact ID",
			"venue": "Event Venue",
			"venueName": "Venue Name",
			"contactName": "Contact Name"
		},
		"collections": []
	},
	"songs": {
		"fields": {
			"songName": "Song Name",
			"composer": "Composer", // name this composer as reference
			"filename": "filename",
			"composerName": "Composer/Contact Name",
			"composerId": "Composer ID"
		},
		"collections": []
	},
	"tracks": {
		"fields": {
			"event": "Event Filename",
			"song": "Song Name",
			"orderNum": 1,
			"set": "Set Number",
			"notes": "Track note",
			"timecodeInHours": 2,
			"timecodeInMinutes": 2,
			"timecodeInSeconds": 2,
			"segue": " ",
			"eventFilename": "Event Filename function"
		},
		"collections": []
	},
}

module.exports = collectionMeta;