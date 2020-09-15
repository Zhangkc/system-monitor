import * as os from "os";

const UNIT = 1024;

export function getMemUsage() {
  return 1 - getFreeMem() / getTotalMem();
}

export function getFreeMem(opt?: string) {
  return parseUnit(os.freemem(), opt);
}

export function getTotalMem(opt?: string) {
  return parseUnit(os.totalmem(), opt)
}

function parseUnit(n: number, opt?: string) {
  switch (opt) {
    case "kb":
      return toKb(n)
    case "mb":
      return toMb(n)
    case "gb":
      return toGb(n)
    default:
      return n
  }
}

function toKb(b: number) {
  return b / UNIT;
}

function toMb(b: number) {
  return b / Math.pow(UNIT, 2);
}

function toGb(b: number) {
  return b / Math.pow(UNIT, 3);
}
