export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const providers = {
  tasks: {
    provider: 'TASK_REPOSITORY',
    inject: ['DATA_SOURCE'],
  },
};
