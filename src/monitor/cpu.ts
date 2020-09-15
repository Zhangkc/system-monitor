import * as os from "os";
import { awaitWrapper, getKeyValue } from "../utils";
import { ParsedCpuInfo, CpuTime } from "../types"

export async function getCpuUsage(sampleTime = 200) {
  const [err, idleRate] = await awaitWrapper(calculateIdleRate(sampleTime));
  if(err) throw err
  return idleRate?.map((val) => 1 - val).reduce((acc, curr) => acc + curr).toFixed(6);
}

export function calculateIdleRate(sampleTime: number) {
  let c1 = parseCpuTime(os.cpus());

  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      let c2 = parseCpuTime(os.cpus());
      resolve(_calculateIdleRate(c1, c2));
    }, sampleTime);
  });
}

function parseCpuTime(cpuInfo: os.CpuInfo[]): ParsedCpuInfo[] {
  return cpuInfo.map((cpu) => {
    let totalCpuTime = 0;
    for (let time in cpu.times) {
      totalCpuTime += getKeyValue(cpu.times, time as CpuTime);
    }
    return {
      total: totalCpuTime,
      idle: cpu.times.idle,
    };
  });
}

function _calculateIdleRate(c1: ParsedCpuInfo[], c2: ParsedCpuInfo[]): number[] {
  return c1.map((val, index) => {
    return (c2[index].idle - val.idle) / (c2[index].total - val.total);
  });
}