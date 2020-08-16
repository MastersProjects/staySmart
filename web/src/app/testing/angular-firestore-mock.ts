import {Observable, of} from 'rxjs';
import {SnapshotOptions} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import {DocumentChangeType, QueryGroupFn} from '@angular/fire/firestore/interfaces';

export class AngularFirestoreMock {
  firestore = {
    batch() {
      return new WriteBatchMock();
    }
  };

  // @ts-ignore
  collection<T>(path: string, queryGroupFn?: QueryGroupFn): AngularFirestoreCollectionMock<T> {
    return new AngularFirestoreCollectionMock<T>();
  }

  // @ts-ignore
  collectionGroup<T>(path: string, queryGroupFn?: QueryGroupFn): AngularFirestoreCollectionGroupMock<T> {
    return new AngularFirestoreCollectionGroupMock<T>();
  }

  // @ts-ignore
  doc<T>(pathOrRef: string | DocumentReferenceMock): AngularFirestoreDocumentMock<T> {
    return new AngularFirestoreDocumentMock<T>();
  }

  createId() {
    return 'createdId';
  }
}

export class AngularFirestoreCollectionMock<T> {
  // @ts-ignore
  valueChanges(options?: { idField: string; }): Observable<T[]> {
    return of([]);
  }

  // @ts-ignore
  doc(path?: string): AngularFirestoreDocumentMock<T> {
    return new AngularFirestoreDocumentMock<T>();
  }

  // @ts-ignore
  add(data: any) {
    return Promise.resolve(new DocumentReferenceMock());
  }
}

export class AngularFirestoreCollectionGroupMock<T> {
  valueChanges(): Observable<T[]> {
    return of([]);
  }

  // @ts-ignore
  get(options?: firestore.GetOptions): Observable<QuerySnapshotMock<firestore.DocumentData>> {
    return of(new QuerySnapshotMock<firestore.DocumentData>());
  }

  // @ts-ignore
  doc(path?: string): AngularFirestoreDocumentMock<T> {
    return new AngularFirestoreDocumentMock<T>();
  }

  // @ts-ignore
  snapshotChanges(events?: DocumentChangeType[]): Observable<any[]> {
    return of([{
      type: 'added',
      payload: {
        doc: new QueryDocumentSnapshotMock()
      }
    }]);
  }

}

export class AngularFirestoreDocumentMock<T> {
  ref: DocumentReferenceMock = new DocumentReferenceMock();

  // @ts-ignore
  update(data: Partial<T>): Promise<void> {
    return Promise.resolve(undefined);
  }

  valueChanges(): Observable<T[]> {
    return of([]);
  }

  snapshotChanges(): Observable<DocumentSnapshotMock<T>> {
    return of(new DocumentSnapshotMock<T>());
  }

  // @ts-ignore
  // tslint:disable-next-line:no-shadowed-variable
  collection<T>(path: string, queryGroupFn?: QueryGroupFn): AngularFirestoreCollectionMock<T> {
    return new AngularFirestoreCollectionMock<T>();
  }

  // @ts-ignore
  set(data: T, options?: { merge?: boolean; mergeFields?: (string | any)[] }): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export class DocumentSnapshotMock<T> {
  payload = {
    id: 'id',
    data() {
      return {} as T;
    }
  };
}

export class QuerySnapshotMock<T> {
  docs: Array<QueryDocumentSnapshotMock<T>> = [];
  empty = true;
}

export class QueryDocumentSnapshotMock<T> {
  ref = new DocumentReferenceMock();

  // @ts-ignore
  data(options?: SnapshotOptions) {
    return {} as T;
  }
}

export class DocumentReferenceMock {
  parent: DocumentReferenceMock;
  path: 'some path';
}

export class WriteBatchMock {
  // @ts-ignore
  set<T>(documentRef: DocumentReferenceMock, data: Partial<T>, options?: { merge?: boolean; mergeFields?: (string | any)[] }
  ): WriteBatchMock {
    return new WriteBatchMock();
  }

  commit(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
