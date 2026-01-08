import type { Task, TaskLevel } from '../types';
import { TaskItem } from './TaskItem';
import { Plus } from 'lucide-react';

interface Props {
  title: string;
  level: TaskLevel;
  tasks: Task[];
  maxCount?: number;
  onAdd: (level: TaskLevel) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  description?: string;
  className?: string;
}

export const TaskGroup = ({ title, level, tasks, maxCount, onAdd, onUpdate, onDelete, description, className }: Props) => {
  const isFull = maxCount ? tasks.length >= maxCount : false;
  const isAllCompleted = maxCount ? (tasks.length >= maxCount && tasks.every(t => t.completed)) : false;
  
  return (
    <div className={`mb-6 bg-white/50 backdrop-blur-sm p-6 rounded-xl border shadow-sm transition-all duration-300 ${
      isAllCompleted 
        ? '!border-l-4 !border-l-paper-highlight !border-y-stone-200/60 !border-r-stone-200/60' 
        : 'border-stone-200/60 border-l-[1px] border-l-stone-200/60'
    } ${className || ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-paper-ink text-lg flex items-center gap-3 h-8">
            {title}
            {maxCount && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono flex items-center justify-center ${isFull ? 'bg-stone-100 text-stone-400' : 'bg-paper-highlight/10 text-paper-highlight'}`}>
                {tasks.length} / {maxCount}
              </span>
            )}
          </h3>
          {description && <p className="text-xs text-stone-400 mt-1">{description}</p>}
        </div>
        
        {!isFull && (
          <button 
            onClick={() => onAdd(level)}
            className="group flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-sm text-stone-500 hover:border-paper-highlight hover:text-paper-highlight transition-all shadow-sm hover:shadow-md h-8 box-border"
          >
            <Plus size={16} className="transition-transform group-hover:rotate-90" />
            <span className="font-medium leading-none mt-0.5">添加</span>
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdate={onUpdate} 
            onDelete={onDelete}
            isMain={level === 'main'}
          />
        ))}
        
        {tasks.length === 0 && (
          <div 
            onClick={() => !isFull && onAdd(level)}
            className="border-2 border-dashed border-stone-200/50 rounded-lg p-8 text-center cursor-pointer hover:border-paper-highlight/30 hover:bg-paper-highlight/5 transition-all group"
          >
            <div className="text-stone-300 group-hover:text-paper-highlight/60 text-sm font-medium">
              暂无{title}，点击添加
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
