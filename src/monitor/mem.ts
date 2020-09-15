import * as os from "os";

const UNIT = 1024;

export function getMemUsage() {
  return 1 - getFreeMem() / getTotalMem();
}

export function getFreeMem() {
  return os.freemem();
}

export function getTotalMem() {
  return os.totalmem();
}

function toKb(b) {
  return b / UNIT;
}

function toMb(b) {
  return b / Math.pow(UNIT, 2);
}

function toGb(b) {
  return b / Math.pow(UNIT, 3);
}
console.log(getMemUsage());
