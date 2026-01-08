import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  show: boolean;
  message: string;
  onClose: () => void;
}

export const Toast = ({ show, message, onClose }: Props) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-300">
      <div className="bg-white/90 backdrop-blur-md border border-stone-200 shadow-floating px-8 py-6 rounded-2xl flex flex-col items-center gap-3 min-w-[240px]">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-1">
          <CheckCircle size={28} strokeWidth={3} />
        </div>
        <p className="text-lg font-bold text-paper-ink">{message}</p>
      </div>
    </div>
  );
};
