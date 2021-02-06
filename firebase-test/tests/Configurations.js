const firebase = require('@firebase/testing');
const {admin, tutor} = require("../test-data/user");
const {getFirestore, getAdminFirestore} = require("../common");

describe('Configurations', () => {
  it('should allow update Configuration doc if isAdmin', async () => {
    const adminFirestore = getAdminFirestore();
    await adminFirestore.collection('Configurations')
      .doc('Configuration')
      .set({gradeLevels: ['1.-3. Klasse']});

    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Configurations').doc('Configuration');
    await firebase.assertSucceeds(testDoc.update({gradeLevels: ['1.-3. Klasse', 'Sekundarstufe']}));
  });

  it('should allow create Configuration doc if isAdmin', async () => {
    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Configurations').doc('Configuration');
    await firebase.assertSucceeds(testDoc.set({gradeLevels: ['1.-3. Klasse', 'Sekundarstufe']}));
  });

  it('should not allow delete Configuration doc if isAdmin', async () => {
    const adminFirestore = getAdminFirestore();
    await adminFirestore.collection('Configurations')
      .doc('Configuration')
      .set({gradeLevels: ['1.-3. Klasse']});

    const firestore = getFirestore(admin);
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

    const firestore = getFirestore(tutor);
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

    const firestore = getFirestore(admin);
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

    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Configurations').doc('AnyDoc');
    await firebase.assertFails(testDoc.get());
  });
});