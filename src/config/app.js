//FireBase
exports.firebaseConfig = {
  apiKey: "AIzaSyBigCuqhJrCufPvr_3anl7FM7u-wJPBHa0",
  authDomain: "josh-fireadmin3.firebaseapp.com",
  databaseURL: "https://josh-fireadmin3.firebaseio.com",
  projectId: "josh-fireadmin3",
  storageBucket: "josh-fireadmin3.appspot.com",
  messagingSenderId: "126583690209"
};



//App setup
exports.adminConfig={
  "appName": "FireAdmin",
  "slogan":"made with love for a better firebase.",
  "design":{
    "sidebarBg":"sidebar-1.jpg", //sidebar-1, sidebar-2, sidebar-3
    "dataActiveColor":"rose", //"purple | blue | green | orange | red | rose"
    "dataBackgroundColor":"black", // "white | black"
  },

  "codeversion": "1.0",
  "allowedUsers":null, //If null, allow all users, else it should be array of allowd users
  "allowGoogleAuth":true, //Allowed users must contain list of allowed users in order to use google auth
  "fieldBoxName": "Fields",
  "maxNumberOfTableHeaders":5,
  "prefixForJoin":["-event"],
  "methodOfInsertingNewObjects":"push", //timestamp (key+time) | push - use firebase keys
  "urlSeparator":"+",
  "urlSeparatorFirestoreSubArray":"~",

  "fieldsTypes":{
    "photo":["photo","image"],
    "dateTime":["end","start","eventDate"],
    "map":["map","latlng","location"],
    "textarea":["description"],
    "html":["content"],
    "radio":["radio","radiotf","featured"],
    "checkbox":["checkbox"],
    "dropdowns":["type", "venueType", "state", "eventType"],
    "file":["video"],
    "rgbaColor":['rgba'],
    "hexColor":['color'],
    "relation":['contact', 'venue'],
    "iconmd":['icon'],
    "iconfa":['iconfa'],
    "iconti":['iconti'],
  },
  "optionsForDateTime":[
    {"key":"end", "dateFormat":"YYYY-MM-DD" ,"timeFormat":true, "saveAs":"x","locale":"es"},
    {"key":"start", "dateFormat":"YYYY-MM-DD" ,"timeFormat":"HH:mm", "saveAs":"YYYY-MM-DD HH:mm"},
    {"key":"eventDate", "dateFormat":"YYYY-MM-DD", "timeFormat":false, "saveAs": "YYYY-MM-DD"}
  ],
  "optionsForSelect":[
      {"key":"dropdowns","options":["new","processing","rejected","completed"]},
      {"key":"checkbox","options":["Skopje","Belgrade","New York"]},
      {"key":"status","options":["just_created","confirmed","canceled"]},
      {"key":"radio","options":["no","maybe","yes"]},
      {"key":"radiotf","options":["true","false"]},
      {"key":"featured","options":["true","false"]},
      {"key":"type","options":["Artists", "Brand", "Contractor", "Employee", "Person"]},
      {"key":"venueType","options":["Amphitheatre", "Theater", "Stadium", "Store", "Boat", "Auditorium", "Resort"]},
      {"key":"state","options":["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georiga", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]},
      {"key":"eventType", "options":["Concert", "Conference", "Corporate Event", "Product Launch"]}
    ],
  "optionsForRelation":[
      {
        //Firestore - Native
        "display": "name",
        "isValuePath": true,
        "key": "contact",
        "path": "/contacts",
        "produceRelationKey": true,
        "relationJoiner": "-",
        "relationKey": "type_eventid",
        "value": "name"
      },
      {
        //Firestore - Native
        // *** only keys you should change are "key" and "path"
        "display": "name",
        "isValuePath": true,
        "key": "venue",
        "path": "/venues",
        "produceRelationKey": true,
        "relationJoiner": "-",
        "relationKey": "type_eventid",
        "value": "name"
      },
      {
        //Firebase - Mimic function
        "display":"name",
        "key":"eventtype",
        "path":"",
        "isValuePath":false,
        "value":"name",
        "produceRelationKey":true,
        "relationJoiner":"-",
        "relationKey":"type_eventid"
      }
  ],
  "paging":{
    "pageSize": 20,
    "finite": true,
    "retainLastPage": false
  }
}

//Navigation
exports.navigation=[
  {
    "link": "/",
    "name": "Dashboard",
    "schema":null,
    "icon":"home",
    "path": "",
    isIndex:true,
  },
  {
    "link": "firestoreadmin",
    "path": "contacts",
    "name": "Contacts",
    "schema": "src/config/firestoreschema.js",
    "icon":"home",
    "tableFields": ["name"]
  },
  {
    "link": "firestoreadmin",
    "path": "venues",
    "name": "Venues",
    "schema": "src/config/firestoreschema.js",
    "icon":"home",
    "tableFields": ["name"]
  },
  {
    "link": "firestoreadmin",
    "path": "events",
    "name": "Events",
    "schema": "src/config/firestoreschema.js",
    "icon":"home",
    "tableFields": ["filename"]
  },
  {
    "link": "firestoreadmin",
    "path": "songs",
    "name": "Songs",
    "schema": "src/config/firestoreschema.js",
    "icon":"home",
    "tableFields": ["songName"]
  }







  ];

exports.pushSettings={
  "pushType":"onesignal", //firebase or onesignal
  "Firebase_AuthorizationPushKey":"AIzaSyCFUf7fspu61J9YsWE-2A-vI9of1ihtSiE", //Firebase push authorization ket
  "pushTopic":"news", //Only for firebase push
  "oneSignal_REST_API_KEY":"",
  "oneSignal_APP_KEY":"",
  "included_segments":"Active Users", //Only for onesignal push
}

exports.userDetails={

}

exports.remoteSetup=false;
exports.remotePath="testadmina";
exports.allowSubDomainControl=true;
exports.subDomainControlHolder="admins/";