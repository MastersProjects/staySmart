const firebase = require('@firebase/testing');
const user = require("../test-data/user");
const tutor = require("../test-data/tutor");
const tutorSearchRequest = require("../test-data/tutor-search-request");
const {getFirestore, getAdminFirestore} = require("../common");

describe('Tutors', () => {
  describe('create', () => {
    it('should allow if Tutors doc', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertSucceeds(testDoc.set(tutor.testDataCreate));
    });

    it('should not allow if not Tutors doc', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('AnyTutor_UID');
      await firebase.assertFails(testDoc.set(tutor.testDataCreate));
    });

    it('should not allow if not Tutors uid', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.set({...tutor.testDataCreate, uid: 'AnyTutor_UID'}));
    });

    it('should not allow if price not valid', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.set({...tutor.testDataCreate, price: 21}));
    });

    it('should not allow if isVerified true', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.set({...tutor.testDataCreate, isVerified: true}));
    });

    it('should not allow if status not new', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.set({...tutor.testDataCreate, status: 'activated'}));
    });

    it('should not allow if fields are missing', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.set(tutor.testDataMissingFields));
    });

    tutor.createRequiredFields.forEach(field => {
      it(`should not allow if field ${field} is missing`, async () => {
        const firestore = getFirestore();
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        const testData = {...tutorSearchRequest.testDataCreate};
        delete testData[field];
        await firebase.assertFails(testDoc.set(testData));
      });
    });

    it('should not allow if not allowed field', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.set({...tutor.testDataCreate, notAllowedField: 'notAllowedField'}));
    });
  });

  describe('update', () => {

    describe('as Tutor', () => {
      it('should allow if Tutors doc', async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertSucceeds(testDoc.update(tutor.testDataUpdateAllowedAsTutor));
      });

      it('should not allow if not Tutors doc', async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.tutor2);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.update(tutor.testDataUpdateAllowedAsTutor));
      });

      it('should not allow if field price invalid', async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.update({...tutor.testDataUpdateAllowedAsTutor, price: 21}));
      });

      tutor.updateNotAllowedFieldsAsTutor.forEach(field => {
        it(`should not allow update field ${field}`, async () => {
          const adminFirestore = getAdminFirestore();
          await adminFirestore.collection('Tutors')
            .doc('Tutor_UID')
            .set(tutor.testData);

          const firestore = getFirestore(user.tutor);
          const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
          await firebase.assertFails(testDoc.update({field}));
        });
      });
    });

    describe('as Admin', () => {
      it('should allow if Admin', async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.admin);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertSucceeds(testDoc.update(tutor.testDataUpdateAllowedAsAdmin));
      });

      it('should not allow update field isVerified invalid', async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.admin);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.update({isVerified: 'invalid'}));
      });

      it('should not allow update field status invalid', async () => {
        const adminFirestore = getAdminFirestore();
        await adminFirestore.collection('Tutors')
          .doc('Tutor_UID')
          .set(tutor.testData);

        const firestore = getFirestore(user.admin);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.update({status: 'invalid'}));
      });

      tutor.updateNotAllowedFieldsAsAdmin.forEach(field => {
        it(`should not allow update field ${field}`, async () => {
          const adminFirestore = getAdminFirestore();
          await adminFirestore.collection('Tutors')
            .doc('Tutor_UID')
            .set(tutor.testData);

          const firestore = getFirestore(user.admin);
          const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
          await firebase.assertFails(testDoc.update({field}));
        });
      });
    });
  });

  describe('get', () => {
    it('should allow if Tutors doc', async () => {
      const firestore = getFirestore(user.tutor);
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow if not Tutors doc', async () => {
      const firestore = getFirestore(user.tutor2);
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.get());
    });

    it('should allow if Admin', async () => {
      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow if not authenticated', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
      await firebase.assertFails(testDoc.get());
    });
  });

  describe('list', () => {
    it('should allow if admin', async () => {
      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Tutors');
      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow if not admin', async () => {
      const firestore = getFirestore(user.tutor2);
      const testDoc = firestore.collection('Tutors');
      await firebase.assertFails(testDoc.get());
    });
  });
});