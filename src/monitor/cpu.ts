import * as os from "os";
import { awaitWrapper } from "../utils";

const ACC = 200;

export async function getCpuUsage() {
  const [err, idleRate] = await awaitWrapper(calculateIdleRate());
  return idleRate.map((val) => 1 - val).reduce((acc, curr)=>acc + curr).toFixed(6);
}

export function calculateIdleRate() {
  let c1 = parseCpuTime(os.cpus());

  return new Promise<number[]>((resolve, reject) => {
    setTimeout(() => {
      let c2 = parseCpuTime(os.cpus());

      resolve(_calculateIdleRate(c1, c2));
    }, ACC);
  });
}

function parseCpuTime(cpuInfo: os.CpuInfo[]) {
  return cpuInfo.map((cpu) => {
    let totalCpuTime = 0;
    for (let time in cpu.times) {
      totalCpuTime += cpu.times[time];
    }
    return {
      total: totalCpuTime,
      idle: cpu.times.idle,
    };
  });
}

function _calculateIdleRate(c1, c2) {
  return c1.map((val, index) => {
    return (c2[index].idle - val.idle) / (c2[index].total - val.total);
  });
}
