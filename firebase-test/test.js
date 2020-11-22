const firebase = require('@firebase/testing');
const tutor = require("./test-data/tutor");
const user = require("./test-data/user");
const tutorSearchRequest = require("./test-data/tutor-search-request");
const tutorSearchRequestContactData = require("./test-data/tutor-search-request-contact-data");
const tutorSearchRequestOffer = require("./test-data/tutor-search-request-offer");

const getFirestore = (auth) => firebase.initializeTestApp({projectId: 'staysmart-dev', auth}).firestore();
const getAdminFirestore = () => firebase.initializeAdminApp({projectId: 'staysmart-dev'}).firestore();


beforeEach(async () => {
  await firebase.clearFirestoreData({projectId: 'staysmart-dev'});
});

describe('Firebase Rules', () => {

  describe('Admins', () => {
    it('should not allow get doc if its not admins doc', async () => {
      const firestore = getFirestore(user.admin2);
      const testDoc = firestore.collection('Admins').doc('Admin_UID');
      await firebase.assertFails(testDoc.get());
    });

    it('should allow get doc if its admins doc', async () => {
      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Admins').doc('Admin_UID');
      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow list admins', async () => {
      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Admins');
      await firebase.assertFails(testDoc.get());
    });

    it('should not allow create doc', async () => {
      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Admins').doc('Admin_UID');
      await firebase.assertFails(testDoc.set({uid: 'Admin_UID'}));
    });

    it('should not allow update doc if its not admins doc', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Admins')
        .doc('Admin_UID')
        .set({uid: 'Admin_UID', firstName: 'Admin', lastName: 'Tester'});

      const firestore = getFirestore(user.admin2);
      const testDoc = firestore.collection('Admins').doc('Admin_UID');
      await firebase.assertFails(testDoc.update({firstName: 'firstName'}));
    });

    it('should allow update doc if its admins doc', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Admins')
        .doc('Admin_UID')
        .set({uid: 'Admin_UID', firstName: 'Admin', lastName: 'Tester'});

      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Admins').doc('Admin_UID');
      await firebase.assertSucceeds(testDoc.update({firstName: 'firstName'}));
    });
  });

  describe('Configurations', () => {
    it('should allow update Configuration doc if isAdmin', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Configurations')
        .doc('Configuration')
        .set({gradeLevels: ['1.-3. Klasse']});

      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Configurations').doc('Configuration');
      await firebase.assertSucceeds(testDoc.update({gradeLevels: ['1.-3. Klasse', 'Sekundarstufe']}));
    });

    it('should allow create Configuration doc if isAdmin', async () => {
      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Configurations').doc('Configuration');
      await firebase.assertSucceeds(testDoc.set({gradeLevels: ['1.-3. Klasse', 'Sekundarstufe']}));
    });

    it('should not allow delete Configuration doc if isAdmin', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Configurations')
        .doc('Configuration')
        .set({gradeLevels: ['1.-3. Klasse']});

      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Configurations').doc('Configuration');
      await firebase.assertFails(testDoc.delete());
    });

    it('should always allow get Configuration doc', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Configurations').doc('Configuration');
      await firebase.assertSucceeds(testDoc.get());
    });

    it('should not allow list Configurations', async () => {
      const firestore = getFirestore();
      const testDoc = firestore.collection('Configurations');
      await firebase.assertFails(testDoc.get());
    });

    it('should not allow write Configuration doc if not isAdmin', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Configurations')
        .doc('Configuration')
        .set({gradeLevels: ['1.-3. Klasse']});

      const firestore = getFirestore(user.tutor);
      const testDoc = firestore.collection('Configurations').doc('Configuration');
      await firebase.assertFails(testDoc.set({any: 'any'}));
      await firebase.assertFails(testDoc.update({any: 'any'}));
      await firebase.assertFails(testDoc.delete());
    });

    it('should not allow write any other doc in Collection', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Configurations')
        .doc('AnyDoc')
        .set({gradeLevels: ['1.-3. Klasse']});

      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Configurations').doc('AnyDoc');
      await firebase.assertFails(testDoc.set({any: 'any'}));
      await firebase.assertFails(testDoc.update({any: 'any'}));
      await firebase.assertFails(testDoc.delete());
    });

    it('should not allow read any other doc in Collection', async () => {
      const adminFirestore = getAdminFirestore();
      await adminFirestore.collection('Configurations')
        .doc('AnyDoc')
        .set({gradeLevels: ['1.-3. Klasse']});

      const firestore = getFirestore(user.admin);
      const testDoc = firestore.collection('Configurations').doc('AnyDoc');
      await firebase.assertFails(testDoc.get());
    });
  });

  describe('Tutors', () => {
    describe('create', () => {
      it('should allow if Tutors doc', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertSucceeds(testDoc.set(tutor.testDataCreate));
      });

      it('should not allow if not Tutors doc', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('AnyTutor_UID');
        await firebase.assertFails(testDoc.set(tutor.testDataCreate));
      });

      it('should not allow if not Tutors uid', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.set({...tutor.testDataCreate, uid: 'AnyTutor_UID'}));
      });

      it('should not allow if not Tutors email', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.set({...tutor.testDataCreate, email: 'any@email.ch'}));
      });

      it('should not allow if price not valid', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.set({...tutor.testDataCreate, price: 21}));
      });

      it('should not allow if isVerified true', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.set({...tutor.testDataCreate, isVerified: true}));
      });

      it('should not allow if status not new', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.set({...tutor.testDataCreate, status: 'activated'}));
      });

      it('should not allow if fields are missing', async () => {
        const firestore = getFirestore(user.tutor);
        const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
        await firebase.assertFails(testDoc.set(tutor.testDataMissingFields));
      });

      tutor.createRequiredFields.forEach(field => {
        it(`should not allow if field ${field} is missing`, async () => {
          const firestore = getFirestore(user.tutor);
          const testDoc = firestore.collection('Tutors').doc('Tutor_UID');
          const testData = {...tutorSearchRequest.testDataCreate};
          delete testData[field];
          await firebase.assertFails(testDoc.set(testData));
        });
      });

      it('should not allow if not allowed field', async () => {
        const firestore = getFirestore(user.tutor);
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
});

after(async () => {
  await firebase.clearFirestoreData({projectId: 'staysmart-dev'});
});