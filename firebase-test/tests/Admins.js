const firebase = require('@firebase/testing');
const {admin, admin2} = require("../test-data/user");
const {getFirestore, getAdminFirestore} = require("../common");

describe('Admins', () => {
  it('should not allow get doc if its not admins doc', async () => {
    const firestore = getFirestore(admin2);
    const testDoc = firestore.collection('Admins').doc('Admin_UID');
    await firebase.assertFails(testDoc.get());
  });

  it('should allow get doc if its admins doc', async () => {
    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Admins').doc('Admin_UID');
    await firebase.assertSucceeds(testDoc.get());
  });

  it('should not allow list admins', async () => {
    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Admins');
    await firebase.assertFails(testDoc.get());
  });

  it('should not allow create doc', async () => {
    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Admins').doc('Admin_UID');
    await firebase.assertFails(testDoc.set({uid: 'Admin_UID'}));
  });

  it('should not allow update doc if its not admins doc', async () => {
    const adminFirestore = getAdminFirestore();
    await adminFirestore.collection('Admins')
      .doc('Admin_UID')
      .set({uid: 'Admin_UID', firstName: 'Admin', lastName: 'Tester'});

    const firestore = getFirestore(admin2);
    const testDoc = firestore.collection('Admins').doc('Admin_UID');
    await firebase.assertFails(testDoc.update({firstName: 'firstName'}));
  });

  it('should allow update doc if its admins doc', async () => {
    const adminFirestore = getAdminFirestore();
    await adminFirestore.collection('Admins')
      .doc('Admin_UID')
      .set({uid: 'Admin_UID', firstName: 'Admin', lastName: 'Tester'});

    const firestore = getFirestore(admin);
    const testDoc = firestore.collection('Admins').doc('Admin_UID');
    await firebase.assertSucceeds(testDoc.update({firstName: 'firstName'}));
  });
});
