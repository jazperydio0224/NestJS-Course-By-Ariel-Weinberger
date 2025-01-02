import { DataSource } from 'typeorm';
import { Tasks } from '../entities/tasks.entity';
import { providers } from '../constants/tasks.constant';

export const tasksProviders = [
  {
    provide: providers.tasks.provider,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tasks),
    inject: providers.tasks.inject,
  },
];
