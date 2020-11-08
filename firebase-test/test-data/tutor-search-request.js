
exports.testDataCreate = {
  "problem": "dsssssssssssssssssssssssssss",
  "status": "new",
  "subject": "Physik",
  "point": {
    "geopoint": {
      "df": 47.4587516784668,
      "wf": 8.582091331481934
    },
    "geohash": "u0qjgr973"
  },
  "budget": 15,
  "gradeLevel": "4. - 6. Klasse",
  "lastName": "Dover",
  "daysAvailable": {
    "sunday": false,
    "tuesday": false,
    "saturday": false,
    "wednesday": false,
    "thursday": true,
    "friday": false,
    "monday": true
  },
  "timestamp": {
    "seconds": 1600635673,
    "nanoseconds": 291000000
  },
  "firstName": "Ben",
  "location": {
    "y": 686220.4375,
    "geomStBox2d": "BOX(683444.551629817 254530.220441777,690015.319377262 259608.990899278)",
    "label": "Kloten (ZH)",
    "lat": 47.4587516784668,
    "x": 257068.953125,
    "lon": 8.582091331481934,
    "detail": "kloten zh"
  }
};

exports.createRequiredFields = ['problem', 'status', 'subject', 'point', 'budget', 'gradeLevel', 'lastName', 'daysAvailable', 'timestamp', 'firstName', 'location'];