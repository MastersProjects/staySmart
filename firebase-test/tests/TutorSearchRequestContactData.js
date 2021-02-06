const firebase = require('@firebase/testing');
const tutorSearchRequestContactData = require("../test-data/tutor-search-request-contact-data");
const {getFirestore, getAdminFirestore} = require("../common");

describe('TutorSearchRequestContactData', () => {
  describe('create', () => {
    it('should allow if valid', async () => {
      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestContactData').doc('TutorSearchRequestContactData');

      await firebase.assertSucceeds(testDoc.set(tutorSearchRequestContactData.testDataCreate));
    });

    tutorSearchRequestContactData.createRequiredFields.forEach(field => {
      it(`should not allow if field ${field} is missing`, async () => {
        const firestore = getFirestore();
        const testDoc = firestore
          .collection('TutorSearchRequests').doc('TutorSearchRequest')
          .collection('TutorSearchRequestContactData').doc('TutorSearchRequestContactData');
        const testData = {...tutorSearchRequestContactData.testDataCreate};
        delete testData[field];
        await firebase.assertFails(testDoc.set(testData));
      });
    });

    it('should not allow if invalid field', async () => {
      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestContactData').doc('TutorSearchRequestContactData');

      await firebase.assertFails(testDoc.set({...tutorSearchRequestContactData.testDataCreate, invalid: 'invalid'}));
    });

    it('should not allow if doc name invalid', async () => {
      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestContactData').doc('Invalid');

      await firebase.assertFails(testDoc.set({...tutorSearchRequestContactData.testDataCreate, invalid: 'invalid'}));
    });
  });

  describe('list', () => {
    it('should allow if valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestContactData').doc('TutorSearchRequestContactData')
        .set(tutorSearchRequestContactData.testData);

      const firestore = getFirestore();
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestContactData')
        .where('linkRef', '==', tutorSearchRequestContactData.testData.linkRef);

      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow if query where condition not valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestContactData').doc('TutorSearchRequestContactData')
        .set(tutorSearchRequestContactData.testData);

      const firestore = getFirestore();
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestContactData')
        .where('email', '==', tutorSearchRequestContactData.testData.email);

      await firebase.assertFails(testDoc.get());
    });

    it('should not allow if list all', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestContactData').doc('TutorSearchRequestContactData')
        .set(tutorSearchRequestContactData.testData);

      const firestore = getFirestore();
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestContactData');

      await firebase.assertFails(testDoc.get());
    });
  });
});