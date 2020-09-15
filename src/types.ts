export interface ParsedCpuInfo {
  total: number
  idle: number
}

export type CpuTime = "user" | "nice" | "sys" | "idle" | "irq"