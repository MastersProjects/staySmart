const firebase = require('@firebase/testing');

exports.getFirestore = (auth) => firebase.initializeTestApp({projectId: 'staysmart-dev', auth}).firestore();
exports.getAdminFirestore = () => firebase.initializeAdminApp({projectId: 'staysmart-dev'}).firestore();
