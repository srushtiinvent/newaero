import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface StoryModalProps {
  title: string;
  emoji: string;
  onClose: () => void;
  children: ReactNode;
}

export default function StoryModal({ title, emoji, onClose, children }: StoryModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* progress bar strip, like a story viewer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-storyIn w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl bg-white dark:bg-midnight-panel border border-aero-fog dark:border-midnight-border max-h-[85vh] overflow-y-auto"
      >
        <div className="flex gap-1 p-3 pb-0">
          <div className="h-1 flex-1 rounded-full bg-aero-primary" />
        </div>

        <div className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-aero-fog dark:border-midnight-border">
          <h3 className="text-base font-semibold text-aero-ink dark:text-midnight-text flex items-center gap-2">
            <span className="text-lg">{emoji}</span> {title}
          </h3>
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-full flex items-center justify-center text-aero-muted hover:bg-aero-mist dark:hover:bg-midnight-border/50">
            <X size={16} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
