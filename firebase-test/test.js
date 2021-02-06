const firebase = require('@firebase/testing');

beforeEach(async () => {
  await firebase.clearFirestoreData({projectId: 'staysmart-dev'});
});

describe('Firebase Rules', () => {
    require('./tests/Admins');
    require('./tests/Configurations');
    require('./tests/Tutors');
    require('./tests/TutorSearchRequests');
    require('./tests/TutorSearchRequestContactData');
    require('./tests/TutorSearchRequestOffers');
});

after(async () => {
  await firebase.clearFirestoreData({projectId: 'staysmart-dev'});
});