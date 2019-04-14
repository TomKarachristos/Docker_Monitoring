export class ContainersViewModel{
  name: string;
  ram: number;
  cpu: number;
  State: string;

  // a better approach will be https://github.com/loedeman/AutoMapper
  // calculates from : https://github.com/moby/moby/blob/eb131c5383db8cac633919f82abad86c99bffbe5/cli/command/container/stats_helpers.go#L175
  constructor(backContainer){
    this.name = backContainer.name;
    this.ram = backContainer.memory_stats.usage / backContainer.memory_stats.limit * 100.0;
    var previousCPU = backContainer.precpu_stats.cpu_usage.total_usage;
    var cpuDelta = backContainer.cpu_stats.cpu_usage.total_usage - previousCPU;
    var previousSystem = backContainer.precpu_stats.system_cpu_usage;
    var systemDelta = backContainer.cpu_stats.system_cpu_usage - previousSystem;
    if(systemDelta > 0 && cpuDelta > -1){
      this.cpu = (cpuDelta / systemDelta) * backContainer.cpu_stats.cpu_usage.percpu_usage.length * 100.0
    }else{
      this.cpu = NaN;
    }
    this.State = backContainer.State;
  }
}