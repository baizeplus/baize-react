interface IConfigQueryParams {
  configName: string;
  configKey: string;
  configType: string;
  beginTime: string;
  endTime: string;
}

interface IConfigItem {
  configId: string;
  configName: string;
  configKey: string;
  configValue: string;
  configType: string;
  remark: string;
  createTime: string;
}
