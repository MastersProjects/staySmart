export class AngularFirePerformanceMock {
  // @ts-ignore
  async trace(name: string): Promise<TraceMock> {
    return new TraceMock();
  }
}

export class TraceMock {
  start = () => {};
  // @ts-ignore
  putAttribute = (name: string, value: string) => {};
  stop = () => {};
}
