interface IJobItem {
  jobId: string;
  jobName: string;
  jobGroup: string;
  invokeTarget: string;
  cronExpression: string;
  status: number;
  misfirePolicy: string;
}

interface IJobLogItem {
  jobLogId: string;
  jobName: string;
  jobGroup: string;
  invokeTarget: string;
  jobMessage: string;
  status: number;
  exceptionInfo: string;
  startTime: string;
  endTime: string;
}
