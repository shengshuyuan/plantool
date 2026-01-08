import type { Task, TaskCategory } from '../types';

interface Props {
  tasks: Task[];
}

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  work: '工作',
  personal: '个人',
  family: '家庭',
};

const CATEGORY_COLORS: Record<TaskCategory, string> = {
  work: 'bg-blue-400',
  personal: 'bg-emerald-400',
  family: 'bg-amber-400',
};

export const StatsSummary = ({ tasks }: Props) => {
  const stats = tasks.reduce((acc, task) => {
    const time = task.actualTime || 0;
    acc[task.category] = (acc[task.category] || 0) + time;
    acc.total += time;
    return acc;
  }, { work: 0, personal: 0, family: 0, total: 0 } as Record<string, number>);

  if (stats.total === 0) {
    return (
      <div className="mt-8 pt-8 border-t border-stone-200 text-center">
        <p className="text-sm text-stone-400 italic">完成任务并录入时间后，此处将显示时间分布统计</p>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-stone-200">
      <div className="mb-6">
        <h3 className="font-bold text-paper-ink text-lg">今日投入分布</h3>
      </div>
      
      <div className="flex h-6 rounded-lg overflow-hidden mb-6 shadow-inner bg-stone-100">
        {Object.entries(CATEGORY_LABELS).map(([key]) => {
          const value = stats[key];
          const percent = (value / stats.total) * 100;
          if (value === 0) return null;
          return (
            <div
              key={key}
              className={`${CATEGORY_COLORS[key as TaskCategory]} transition-all duration-700 hover:opacity-90 relative group cursor-help`}
              style={{ width: `${percent}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold whitespace-nowrap bg-black/10 transition-opacity">
                {percent.toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center gap-8">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const value = stats[key];
          return (
            <div key={key} className={`text-center transition-opacity duration-300 ${value === 0 ? 'opacity-30' : 'opacity-100'}`}>
              <div className="text-xs text-stone-500 mb-1 flex items-center justify-center gap-1.5 font-medium">
                <div className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[key as TaskCategory]}`} />
                <span className="leading-none pt-0.5">{label}</span>
              </div>
              <div className="font-bold text-lg text-paper-ink">{value.toFixed(1)}<span className="text-xs font-normal text-stone-400 ml-0.5">h</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
