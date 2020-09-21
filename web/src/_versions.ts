export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
}
export const versions: TsAppVersion = {
    version: '0.0.1',
    name: 'stay-smart',
    versionDate: '2020-09-21T18:45:57.001Z',
    gitCommitHash: '04c85e2',
    versionLong: '0.0.1-04c85e2',
    gitTag: 'null',
};
export default versions;
