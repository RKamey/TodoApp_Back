enum TaskStatus {
  TODO,
  DOING,
  DONE
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: Date;
  user_id: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  due_date: Date;
  user_id: number;
}

export type UpdateTaskDto = Partial<CreateTaskDto>