import { getCpuUsage, getMemUsage } from '../src'

getCpuUsage(200).then(res => console.log(`cpu usage: ${res}`))
console.log(`mem usage: ${getMemUsage()}`)