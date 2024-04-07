interface IDiskItem {
  path: string;
  fstype: string;
  total: number;
  free: number;
  used: number;
  usedPercent: number;
  inodesTotal: number;
  inodesUsed: number;
  inodesFree: number;
  inodesUsedPercent: number;
}

interface IServer {
  cpuNum: number;
  cpuNumThread: number;
  cpuUsed: string;
  cpuAvg1: string;
  cpuAvg5: string;
  cpuAvg15: string;
  memTotal: string;
  memUsed: string;
  memFree: string;
  memUsage: string;
  goTotal: number;
  goUsed: string;
  goHome: string;
  sysComputerIp: string;
  sysComputerName: string;
  sysOsName: string;
  sysOsArch: string;
  goStartTime: string;
  goRunTime: number;
  goUserDir: string;
  diskList: IDiskItem[];
}
