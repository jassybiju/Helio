export interface IMessageQueue {
  addJob(jobName: string, payload: unknown): Promise<string>;
}
