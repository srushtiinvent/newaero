import { useState } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from '../types';

const INITIAL: ChatMessage[] = [
  { id: 'm1', role: 'assistant', text: "Hi! I'm your AeroPath assistant. Ask me about your flights, baggage policy, or destination info." },
];

export default function Help() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    // TODO: replace with real call to help/assistant endpoint
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', text: 'Let me check that for you \u2014 this response will come from the assistant backend once it\u2019s connected.' }]);
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto px-5 py-8 flex flex-col h-[calc(100vh-140px)]">
      <h2 className="text-lg font-semibold text-aero-ink dark:text-midnight-text mb-4">Help</h2>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
                m.role === 'user'
                  ? 'bg-aero-primary text-white rounded-br-sm'
                  : 'bg-aero-mist/60 dark:bg-midnight-panel text-aero-ink dark:text-midnight-text rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sticky bottom-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about your trip..."
          className="flex-1 px-4 py-3 rounded-full border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-panel text-sm text-aero-ink dark:text-midnight-text focus:outline-none focus:ring-2 focus:ring-aero-primary/30"
        />
        <button
          onClick={send}
          aria-label="Send message"
          className="w-11 h-11 shrink-0 rounded-full bg-aero-primary text-white flex items-center justify-center hover:bg-aero-primary/90 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
