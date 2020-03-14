// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import versions from '../_versions';

export const environment = {
  production: false,
  version: versions.versionLong,
  firebase: {
    apiKey: 'AIzaSyB0mb8Nwo4HG7aV7sYOdKnOoYDONhbIKes',
    authDomain: 'staysmart-dev.firebaseapp.com',
    databaseURL: 'https://staysmart-dev.firebaseio.com',
    projectId: 'staysmart-dev',
    storageBucket: 'staysmart-dev.appspot.com',
    messagingSenderId: '1026658607075',
    appId: '1:1026658607075:web:e2668fc32b302527'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
