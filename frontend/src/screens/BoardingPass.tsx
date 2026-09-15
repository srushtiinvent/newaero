import { useState } from 'react';
import { QrCode, Plus, FileText, ImageIcon, X } from 'lucide-react';
import { mockBoardingPasses } from '../data/mockData';
import { BoardingPass as BoardingPassType } from '../types';

export default function BoardingPass() {
  const passes = mockBoardingPasses;
  const [activePass, setActivePass] = useState<BoardingPassType | null>(null);
  const [showAddSheet, setShowAddSheet] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-5 py-8">
      <h2 className="text-lg font-semibold text-aero-ink dark:text-midnight-text mb-5">Boarding passes</h2>

      <div className="space-y-3 mb-6">
        {passes.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePass(p)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-card border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-panel hover:border-aero-primary/50 transition-colors text-left shadow-sm dark:shadow-lg dark:shadow-black/30"
          >
            <div>
              <div className="font-semibold text-aero-ink dark:text-midnight-text">{p.route}</div>
              <div className="text-xs text-aero-muted dark:text-midnight-muted mt-0.5">
                {p.date} · Seat {p.seat} · Gate {p.gate} · {p.terminal}
              </div>
            </div>
            <QrCode className="text-aero-primary dark:text-aero-light" size={22} />
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowAddSheet(true)}
        className="w-full py-3.5 rounded-full text-white font-semibold text-sm bg-gradient-to-br from-aero-primary to-aero-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aero-primary/30 transition-all"
      >
        + Add boarding pass
      </button>

      {/* fullscreen high-contrast QR view for gate scanners */}
      {activePass && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-8" onClick={() => setActivePass(null)}>
          <button onClick={() => setActivePass(null)} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} className="text-gray-700" />
          </button>
          <div className="w-56 h-56 bg-black flex items-center justify-center text-white text-[10px] p-4 text-center break-all mb-6 rounded-md">
            {activePass.qrValue}
          </div>
          <div className="text-2xl font-bold text-gray-900">{activePass.route}</div>
          <div className="text-sm text-gray-500 mt-1">{activePass.date} · Seat {activePass.seat} · Gate {activePass.gate}</div>
        </div>
      )}

      {/* add boarding pass action sheet */}
      {showAddSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setShowAddSheet(false)}>
          <div onClick={(e) => e.stopPropagation()} className="animate-storyIn w-full sm:max-w-sm bg-white dark:bg-midnight-panel rounded-t-2xl sm:rounded-2xl sm:mb-8 p-5">
            <div className="w-10 h-1 bg-aero-fog dark:bg-midnight-border rounded-full mx-auto mb-4 sm:hidden" />
            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg hover:bg-aero-mist/50 dark:hover:bg-midnight-bg text-left text-sm text-aero-ink dark:text-midnight-text">
              <FileText size={17} className="text-aero-primary" /> Select PDF from device storage
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg hover:bg-aero-mist/50 dark:hover:bg-midnight-bg text-left text-sm text-aero-ink dark:text-midnight-text">
              <ImageIcon size={17} className="text-aero-primary" /> Select image from gallery
            </button>
            <button onClick={() => setShowAddSheet(false)} className="w-full mt-2 py-3 text-center text-sm text-aero-muted dark:text-midnight-muted">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}