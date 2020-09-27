const assert = require('assert');
const firebase = require('@firebase/testing');

describe('Firebase Rules', () => {

  const getFirestore = (auth) => firebase.initializeTestApp({projectId: 'staysmart-dev', auth}).firestore();

  it('should test example', () => {
    assert.strictEqual(1 + 1, 2);
  });

  it('should test firestore rules example', async () => {
    const firestore = getFirestore(null);
    const testDoc = firestore.collection('Configurations').doc('Configuration');
    await firebase.assertSucceeds(testDoc.get());
  });
});