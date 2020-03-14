interface TsAppVersion {
    version: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
}
const obj: TsAppVersion = {
    version: '0.0.1',
    versionDate: '2020-03-14T02:40:19.754Z'
};
obj.gitCommitHash = '2750e87';
obj.versionLong = '0.0.1-2750e87';
obj.gitTag = 'null';
export default obj;
