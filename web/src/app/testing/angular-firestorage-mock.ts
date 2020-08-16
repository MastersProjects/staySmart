import {of} from 'rxjs';
import {UploadMetadata} from '@angular/fire/storage/interfaces';

export class AngularFireStorageMock {
  // @ts-ignore
  ref(path: string) {
    return {
      getDownloadURL() {
        return of('downloadURL');
      },

      // @ts-ignore
      put(data: any, metadata?: UploadMetadata | undefined) {
        return new AngularFireUploadTaskMock();
      }
    };
  }
}

export class AngularFireUploadTaskMock {
  // @ts-ignore
  then(onFulfilled?: ((a: UploadTaskSnapshotMock) => any) | null, onRejected?: ((a: Error) => any) | null): Promise<any> {
    return Promise.resolve(new UploadTaskSnapshotMock());
  }
}

export class UploadTaskSnapshotMock {
  ref = {
    getDownloadURL() {
      return of('downloadURL');
    },
    fullPath: 'fullPath'
  };
  state = 'success';
}

