interface Props {
  review?: string;
  onUpdate: (val: string) => void;
}

export const DailyReview = ({ review = '', onUpdate }: Props) => {
  return (
    <div className="mt-8 pt-8 border-t border-stone-200">
      <div className="mb-4">
        <h3 className="font-bold text-paper-ink text-lg">今日复盘</h3>
        <p className="text-xs text-stone-400 mt-1">写下今天你的所思所想，哪些可以优化的</p>
      </div>
      
      <div className="relative">
        <textarea
          value={review}
          onChange={(e) => onUpdate(e.target.value.slice(0, 500))}
          placeholder="写下今天的感悟、总结或明天的计划..."
          className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-lg resize-none focus:outline-none focus:border-paper-highlight focus:bg-white transition-colors text-sm text-paper-ink leading-relaxed"
        />
        <div className="absolute bottom-3 right-3 text-[10px] text-stone-400 font-mono" data-export-hide="true">
          {review.length} / 500
        </div>
      </div>
    </div>
  );
};
