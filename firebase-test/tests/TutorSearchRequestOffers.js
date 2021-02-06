const firebase = require('@firebase/testing');
const user = require("../test-data/user");
const tutor = require("../test-data/tutor");
const tutorSearchRequestOffer = require("../test-data/tutor-search-request-offer");
const {getFirestore, getAdminFirestore} = require("../common");

describe('TutorSearchRequestOffers', () => {
  describe('create', () => {
    it('should allow if valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Tutors')
        .doc('Tutor_UID')
        .set({...tutor.testData, status: 'activated'});

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertSucceeds(testDoc.add(tutorSearchRequestOffer.testDataCreate));
    });

    tutorSearchRequestOffer.createRequiredFields.forEach(field => {
      it(`should not allow if field ${field} is missing`, async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set({...tutor.testData, status: 'activated'});

        const firestore = getFirestore(user.tutor);
        const testDoc = firestore
          .collection('TutorSearchRequests').doc('TutorSearchRequest')
          .collection('TutorSearchRequestOffers');
        const testData = {...tutorSearchRequestOffer.testDataCreate};
        delete testData[field];

        await firebase.assertFails(testDoc.add(testData));
      });
    });

    it('should not allow if field status not new', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Tutors')
        .doc('Tutor_UID')
        .set({...tutor.testData, status: 'activated'});

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.add({...tutorSearchRequestOffer.testDataCreate, status: 'invalid'}));
    });

    it('should not allow if uid not from tutor', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Tutors')
        .doc('Tutor_UID')
        .set({...tutor.testData, status: 'activated'});

      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.add({...tutorSearchRequestOffer.testDataCreate, uid: 'otherUid'}));
    });

    it('should not allow if not authenticated', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Tutors')
        .doc('Tutor_UID')
        .set({...tutor.testData, status: 'activated'});

      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.add(tutorSearchRequestOffer.testDataCreate));
    });

    it('should not allow if tutor not activated', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Tutors')
        .doc('Tutor_UID')
        .set({...tutor.testData, status: 'new'});

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.add(tutorSearchRequestOffer.testDataCreate));
    });

    it('should not allow if field isVerified is invalid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Tutors')
        .doc('Tutor_UID')
        .set({...tutor.testData, status: 'new'});

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.add({...tutorSearchRequestOffer.testDataCreate, isVerified: true}));
    });
  });

  describe('update', () => {
    it('should allow if accepted valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer');
      await firebase.assertSucceeds(testDoc.update(tutorSearchRequestOffer.testDataUpdateAcceptedAllowed));
    });

    it('should allow if declined valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer');
      await firebase.assertSucceeds(testDoc.update(tutorSearchRequestOffer.testDataUpdateDeclinedAllowed));
    });

    it('should allow update field tutorSearchRequest if declined', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer');

      await firebase.assertFails(testDoc.update({
        ...tutorSearchRequestOffer.testDataUpdateDeclinedAllowed,
        tutorSearchRequest: {tutorSearchRequestContactData: 'tutorSearchRequestContactData'}
      }));
    });

    tutorSearchRequestOffer.updateNotAllowedFields.forEach(field => {
      it(`should not allow update field ${field}`, async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('TutorSearchRequests').doc('TutorSearchRequest')
          .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer');

        await firebase.assertFails(testDoc.update({field}));
      });
    });
  });

  describe('list', () => {
    it('should allow if admin', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.admin);
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertSucceeds(testDoc.get());
    });

    it('should allow unauthenticated if query status new', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set({...tutorSearchRequestOffer.testDataCreate, status: 'new'});

      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').where('status', '==', 'new');

      await firebase.assertSucceeds(testDoc.get());
    });

    it('should allow unauthenticated if query status accepted', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set({...tutorSearchRequestOffer.testDataCreate, status: 'accepted'});

      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').where('status', '==', 'accepted');

      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow unauthenticated list all', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.get());
    });

    it('should not allow unauthenticated invalid query', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').where('uid', '==', 'declined');

      await firebase.assertFails(testDoc.get());
    });
  });

  describe('list (collection group)', () => {
    it('should allow if admin', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.admin);
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestOffers');

      await firebase.assertSucceeds(testDoc.get());
    });

    it('should allow if tutor valid', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestOffers').where('uid', '==', user.tutor.uid);

      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow if not tutors TutorSearchRequestOffer', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestOffers').where('uid', '==', user.tutor2.uid);

      await firebase.assertFails(testDoc.get());
    });

    it('should not allow if not authenticated', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore
        .collection('TutorSearchRequests').doc('TutorSearchRequest')
        .collection('TutorSearchRequestOffers').doc('TutorSearchRequestOffer')
        .set(tutorSearchRequestOffer.testDataCreate);

      const firestore = getFirestore();
      const testDoc = firestore
        .collectionGroup('TutorSearchRequestOffers');

      await firebase.assertFails(testDoc.get());
    });
  });
});