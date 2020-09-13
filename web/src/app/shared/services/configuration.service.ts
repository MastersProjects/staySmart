import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {Configuration} from '../model/configuration.model';
import {Observable} from 'rxjs';
import {trace} from '@angular/fire/performance';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  getConfigurationValueChanges(): Observable<Configuration> {
    return this.angularFirestore.collection('Configurations').doc<Configuration>('Configuration')
      .valueChanges().pipe(
        trace('getConfigurationValueChanges'),
      );
  }

  getConfiguration(): Observable<Configuration> {
    return this.angularFirestore.collection('Configurations').doc('Configuration')
      .get().pipe(
        map((snap: DocumentSnapshot<Configuration>) => snap.data()),
        trace('getConfiguration'),
      );
  }

  saveConfiguration(configuration: Partial<Configuration>): Promise<void> {
    return this.angularFirestore.collection('Configurations')
      .doc<Configuration>('Configuration')
      .update(configuration);
  }
}
