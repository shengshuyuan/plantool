import type { Task, TaskCategory } from '../types';
import { Check, Trash2 } from 'lucide-react';

interface Props {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  isMain?: boolean;
}

const CATEGORY_STYLES: Record<TaskCategory, string> = {
  work: 'bg-blue-50 text-blue-600 border-blue-200',
  personal: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  family: 'bg-amber-50 text-amber-600 border-amber-200',
};

export const TaskItem = ({ task, onUpdate, onDelete, isMain }: Props) => {
  return (
    <div className={`group relative flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
      task.completed 
        ? 'bg-stone-50 border-stone-100' 
        : 'bg-white border-stone-200 hover:border-paper-highlight hover:shadow-sm'
    } ${isMain ? 'p-6' : ''}`}>
      
      {/* Checkbox */}
      <button
        onClick={() => onUpdate(task.id, { completed: !task.completed })}
        className={`flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
          task.completed 
            ? 'bg-paper-ink border-paper-ink text-white scale-110' 
            : 'border-stone-300 text-transparent hover:border-paper-highlight'
        } ${isMain ? 'w-8 h-8' : 'w-5 h-5'}`}
      >
        <Check size={isMain ? 18 : 12} strokeWidth={3} />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0 flex items-center">
         <input
           type="text"
           value={task.title}
           onChange={(e) => onUpdate(task.id, { title: e.target.value })}
           placeholder="输入任务名称..."
           className={`w-full bg-transparent outline-none placeholder:text-stone-300 transition-all ${
             task.completed ? 'line-through text-stone-400' : 'text-paper-ink'
           } ${isMain ? 'text-xl font-bold' : 'text-base font-medium'}`}
         />
      </div>

      {/* Category Pill */}
      <div className="relative group/select">
        <select
          value={task.category}
          onChange={(e) => onUpdate(task.id, { category: e.target.value as TaskCategory })}
          className={`appearance-none text-xs font-medium px-3 py-1 rounded-full border cursor-pointer outline-none transition-colors ${CATEGORY_STYLES[task.category]}`}
        >
          <option value="work">工作</option>
          <option value="personal">个人</option>
          <option value="family">家庭</option>
        </select>
      </div>

      {/* Time Inputs */}
      <div className="flex items-center gap-3 text-sm ml-2 pl-3 border-l border-stone-100">
        <div className="flex flex-col items-end">
          <label className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-0.5">预估</label>
          <div className="flex items-baseline gap-1 group/input">
             <input
               type="number"
               value={task.estimatedTime || ''}
               onChange={(e) => {
                 const val = parseFloat(e.target.value);
                 if (val >= 0 || e.target.value === '') {
                   onUpdate(task.id, { estimatedTime: isNaN(val) ? 0 : val });
                 }
               }}
               step="0.5"
               min="0"
               placeholder="0"
               className="w-12 text-right bg-transparent border-b border-transparent group-hover/input:border-stone-200 focus:!border-paper-highlight outline-none transition-colors"
             />
             <span className="text-stone-400 text-xs">h</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <label className="text-[10px] text-paper-highlight font-bold uppercase tracking-wider mb-0.5">实际</label>
           <div className="flex items-baseline gap-1 group/input">
             <input
               type="number"
               value={task.actualTime || ''}
               onChange={(e) => {
                 const val = parseFloat(e.target.value);
                 if (val >= 0 || e.target.value === '') {
                   onUpdate(task.id, { actualTime: isNaN(val) ? 0 : val });
                 }
               }}
               step="0.5"
               min="0"
               placeholder="0"
               className="w-12 text-right font-bold text-paper-highlight bg-transparent border-b border-transparent group-hover/input:border-paper-highlight focus:!border-paper-highlight outline-none transition-colors"
             />
             <span className="text-paper-highlight text-xs">h</span>
          </div>
        </div>
      </div>
      
      {/* Delete Button (absolute to not affect layout much, but positioned) */}
      <button 
        onClick={() => onDelete(task.id)}
        className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 bg-white shadow-sm border border-stone-200 rounded-full p-1.5 text-stone-300 hover:text-red-500 hover:border-red-200 transition-all z-10"
        title="删除任务"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};
