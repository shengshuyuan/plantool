import { useTaskManager } from './hooks/useTaskManager';
import { Header } from './components/Header';
import { TimeBudget } from './components/TimeBudget';
import { TaskGroup } from './components/TaskGroup';
import { StatsSummary } from './components/StatsSummary';
import { DailyReview } from './components/DailyReview';
import * as htmlToImage from 'html-to-image';
import { Toast } from './components/Toast';
import confetti from 'canvas-confetti';
import { useRef, useState } from 'react';
import type { Task } from './types';

function App() {
  const { data, addTask, updateTask, deleteTask, setBudget, updateReview, currentDate, changeDate, isToday } = useTaskManager();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);

  const handleTaskUpdate = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
    // If marking as completed
    if (updates.completed === true) {
      setShowToast(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E65540', '#3B82F6', '#10B981', '#F59E0B']
      });
    }
  };

  const handleExport = async () => {
    if (!containerRef.current) return;
    
    try {
      // 添加 .exporting 类以应用 CSS 样式优化 (隐藏边框、背景等)
      containerRef.current.classList.add('exporting');
      
      // 等待一小段时间让样式生效 (虽然通常是同步的，但在某些浏览器中可能需要重新布局)
      // 使用 html-to-image 替代 html2canvas
      const dataUrl = await htmlToImage.toPng(containerRef.current, {
        backgroundColor: '#F5F5F0',
        pixelRatio: 2, // 对应 Retina 屏幕
        filter: (node) => {
          // 过滤掉不需要导出的元素 (虽然 CSS 也能隐藏，但这里双重保险)
          if (node instanceof HTMLElement) {
             if (node.hasAttribute('data-html2canvas-ignore') || node.classList.contains('export-hidden')) {
               return false;
             }
          }
          return true;
        }
      });
      
      containerRef.current.classList.remove('exporting');

      const link = document.createElement('a');
      link.download = `Plantool-Daily-${currentDate}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      containerRef.current.classList.remove('exporting');
      alert('导出图片失败，请重试');
    }
  };

  const mainTasks = data.tasks.filter(t => t.level === 'main');
  const mediumTasks = data.tasks.filter(t => t.level === 'medium');
  const smallTasks = data.tasks.filter(t => t.level === 'small');
  const otherTasks = data.tasks.filter(t => t.level === 'other');

  return (
    <div className="min-h-screen bg-paper-bg py-8 px-4 flex justify-center font-sans text-paper-ink">
      {/* A4 Paper Container */}
      <div ref={containerRef} className="w-full max-w-3xl bg-paper-card shadow-paper min-h-[1122px] p-6 md:p-12 relative rounded-sm">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 opacity-50"></div>
        
        <Header 
          dateStr={currentDate}
          onPrev={() => changeDate(-1)}
          onNext={() => changeDate(1)}
          isToday={isToday}
          onExport={handleExport}
        />
        
        <TimeBudget 
          budget={data.timeBudget} 
          tasks={data.tasks} 
          onBudgetChange={setBudget} 
        />

        <div className="space-y-4">
          <TaskGroup 
            title="最重要任务" 
            level="main" 
            tasks={mainTasks} 
            maxCount={1}
            onAdd={addTask}
            onUpdate={handleTaskUpdate}
            onDelete={deleteTask}
            description="今日的核心目标，请务必优先完成"
            className="border-l-4 border-l-paper-highlight/80 bg-red-50/30"
          />

          <TaskGroup 
            title="中等任务" 
            level="medium" 
            tasks={mediumTasks} 
            maxCount={3}
            onAdd={addTask}
            onUpdate={handleTaskUpdate}
            onDelete={deleteTask}
            description="今天中等任务，优先保障完成"
          />

          <TaskGroup 
            title="小型任务" 
            level="small" 
            tasks={smallTasks} 
            maxCount={5}
            onAdd={addTask}
            onUpdate={handleTaskUpdate}
            onDelete={deleteTask}
            description="今日小型任务，争取30分钟内完成的"
          />

          <TaskGroup 
            title="其他任务" 
            level="other" 
            tasks={otherTasks}
            onAdd={addTask}
            onUpdate={handleTaskUpdate}
            onDelete={deleteTask}
            description="临时的、琐碎的待办事项"
            className="opacity-90"
          />
        </div>
        
        <DailyReview 
          review={data.review}
          onUpdate={updateReview}
        />

        <StatsSummary tasks={data.tasks} />
        
        <footer className="mt-16 flex justify-between items-end text-[10px] text-stone-300 font-mono tracking-widest uppercase">
          <span>Personal Task Manager &bull; Daily Planner</span>
          <span className="font-serif italic text-stone-400">赛博树园</span>
        </footer>

        <Toast 
          show={showToast} 
          message="恭喜你完成任务！🎉" 
          onClose={() => setShowToast(false)} 
        />
      </div>
    </div>
  );
}

export default App;
