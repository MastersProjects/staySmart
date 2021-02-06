const firebase = require('@firebase/testing');
const user = require("../test-data/user");
const tutorSearchRequest = require("../test-data/tutor-search-request");
const {getFirestore, getAdminFirestore} = require("../common");

describe('TutorSearchRequests', () => {
  describe('create', () => {
    it('should allow if valid', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertSucceeds(testDoc.set(tutorSearchRequest.testDataCreate));
    });

    tutorSearchRequest.createRequiredFields.forEach(field => {
      it(`should not allow if field ${field} is missing`, async () => {
        const firestore = getFirestore();
        const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
        const testData = {...tutorSearchRequest.testDataCreate};
        delete testData[field];
        await firebase.assertFails(testDoc.set(testData));
      });
    });

    it('should not allow if field status not new', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertFails(testDoc.set({...tutorSearchRequest.testDataCreate, status: 'invalid'}));
    });

    it('should not allow if field budget invalid', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertFails(testDoc.set({...tutorSearchRequest.testDataCreate, budget: 21}));
    });
  });

  describe('update', () => {
    it('should allow if field status valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests')
        .doc('TutorSearchRequest')
        .set(tutorSearchRequest.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertSucceeds(testDoc.update({status: 'mediated'}));
    });

    it('should not allow if field status invalid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests')
        .doc('TutorSearchRequest')
        .set(tutorSearchRequest.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertFails(testDoc.update({status: 'invalid'}));
    });

    it('should not allow if not status', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests')
        .doc('TutorSearchRequest')
        .set(tutorSearchRequest.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertFails(testDoc.update({problem: 'problem'}));
    });
  });

  describe('get', () => {
    it('should always allow', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests')
        .doc('TutorSearchRequest')
        .set(tutorSearchRequest.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest');
      await firebase.assertSucceeds(testDoc.get());
    });
  });

  describe('list', () => {
    it('should allow if authenticated', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests')
        .doc('TutorSearchRequest')
        .set(tutorSearchRequest.testDataCreate);

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore.collection('TutorSearchRequests');
      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow if not authenticated', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests')
        .doc('TutorSearchRequest')
        .set(tutorSearchRequest.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore.collection('TutorSearchRequests');
      await firebase.assertFails(testDoc.get());
    });
  });
});