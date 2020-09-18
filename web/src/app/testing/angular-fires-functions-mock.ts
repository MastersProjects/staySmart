import {Observable, of} from 'rxjs';

export class AngularFireFunctionsMock {

  // @ts-ignore
  httpsCallable = (name: string) => (data: any) => of('result') as Observable<any>;
}
