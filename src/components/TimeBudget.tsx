import type { DailyData } from '../types';

interface Props {
  budget: number;
  tasks: DailyData['tasks'];
  onBudgetChange: (val: number) => void;
}

export const TimeBudget = ({ budget, tasks, onBudgetChange }: Props) => {
  const totalActual = tasks.reduce((sum, t) => sum + (t.actualTime || 0), 0);
  const percent = Math.min((totalActual / (budget || 1)) * 100, 100);

  return (
    <div className="mb-8 p-6 bg-stone-50 rounded-xl border border-paper-line shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <div>
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">今日可用时间预算</label>
          <div className="flex items-baseline gap-2">
            <input
              type="number"
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="text-4xl font-black bg-transparent border-b-2 border-dashed border-stone-300 focus:border-paper-highlight focus:outline-none w-24 text-center text-paper-ink"
            />
            <span className="text-stone-400 font-medium">小时</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">实际已投入</div>
          <div className="text-3xl font-bold text-paper-ink tabular-nums">
            {totalActual.toFixed(1)} 
            <span className="text-lg font-medium text-stone-300 ml-1">/ {budget}h</span>
          </div>
        </div>
      </div>

      <div className="h-3 bg-stone-200 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-700 ease-out ${percent > 100 ? 'bg-red-500' : 'bg-paper-highlight'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-stone-400 font-mono">
        <span>0h</span>
        <span>{budget / 2}h</span>
        <span>{budget}h</span>
      </div>
    </div>
  );
};
