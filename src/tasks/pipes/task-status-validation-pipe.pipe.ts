import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../constants/tasks.constant';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = { ...value, status: value?.status.toUpperCase() };
    if (!this.isStatusInvalid(value)) {
      throw new BadRequestException(`${value.status} is invalid`);
    }

    return value;
  }

  private isStatusInvalid(status: any) {
    return this.allowedStatuses.indexOf(status) === -1;
  }
}
