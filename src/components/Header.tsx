import { Calendar, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface Props {
  dateStr: string;
  onPrev: () => void;
  onNext: () => void;
  isToday: boolean;
  onExport: () => void;
}

export const Header = ({ dateStr, onPrev, onNext, isToday, onExport }: Props) => {
  const dateObj = new Date(dateStr);
  const formattedDate = dateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="mb-8 pt-8 relative">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight text-paper-ink mb-3 font-serif">个人任务管理局</h1>
        
        <div className="flex items-center justify-center gap-4 text-stone-500 font-mono select-none">
          <button 
            onClick={onPrev}
            className="p-1 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-400 hover:text-paper-ink"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 min-w-[200px] justify-center">
            <Calendar size={18} />
            <span className="text-sm font-medium">{formattedDate}</span>
            {isToday && <span className="text-[10px] bg-paper-highlight/10 text-paper-highlight px-1.5 py-0.5 rounded font-bold">TODAY</span>}
          </div>

          <button 
            onClick={onNext}
            disabled={isToday}
            className={`p-1 rounded-full transition-colors ${isToday ? 'opacity-20 cursor-not-allowed' : 'hover:bg-stone-100 cursor-pointer text-stone-400 hover:text-paper-ink'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="w-24 h-1 bg-paper-ink mx-auto mt-6 rounded-full opacity-10"></div>
      </div>

      <button
        onClick={onExport}
        className="absolute right-0 top-8 p-2 text-stone-400 hover:text-paper-ink hover:bg-stone-100 rounded-lg transition-all group"
        title="导出今日手帐"
        data-export-hide="true"
      >
        <Download size={20} />
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-paper-ink text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          保存为图片
        </span>
      </button>
    </div>
  );
};
