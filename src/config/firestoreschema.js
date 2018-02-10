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
			"name": "Event Name",
			"eventType": "Event Type",
			"id": "Event ID",
			"filename": "filename",
			"eventDate": "Date",
			"identifier": "Unique ID name",
			"contact": "Events Contact",
			"venue": "Event Venue"
		},
		"collections": []
	},
}

module.exports = collectionMeta;