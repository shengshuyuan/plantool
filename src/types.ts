export type TaskLevel = 'main' | 'medium' | 'small' | 'other';
export type TaskCategory = 'personal' | 'work' | 'family';

export interface Task {
  id: string;
  title: string;
  level: TaskLevel;
  category: TaskCategory;
  estimatedTime: number; // 小时
  actualTime: number; // 小时
  completed: boolean;
  createdAt: number;
}

export interface DailyData {
  date: string; // YYYY-MM-DD
  timeBudget: number; // 总预算 (小时)
  tasks: Task[];
  review?: string; // 今日复盘
}
