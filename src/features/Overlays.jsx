import { lazy, Suspense } from 'react';
import { useUI } from '../lib/ui';
import Icon from '../components/ui/Icon';

const RecruiterMode = lazy(() => import('./RecruiterMode'));
const Terminal = lazy(() => import('./Terminal'));
const AskRaj = lazy(() => import('./AskRaj'));

/** Hosts the optional extras. Each one is code-split and loads only when opened. */
export default function Overlays() {
  const { overlay, close, toggle } = useUI();
  const askOpen = overlay === 'ask';

  return (
    <div className="no-print">
      <button
        type="button"
        data-ask-launcher
        onClick={() => toggle('ask')}
        aria-expanded={askOpen}
        aria-controls={askOpen ? 'ask-panel' : undefined}
        className="fixed bottom-5 right-5 z-[60] inline-flex min-h-[44px] items-center gap-2 rounded-full border border-rule-strong bg-graphite/90 px-4 text-sm font-medium text-paper shadow-lg backdrop-blur-md transition-colors hover:border-signal/50"
      >
        <Icon name={askOpen ? 'close' : 'sparkle'} className="h-4 w-4 text-signal" />
        <span className="hidden sm:inline">{askOpen ? 'Close' : 'Ask about Raj'}</span>
        <span className="sm:hidden">{askOpen ? 'Close' : 'Ask'}</span>
      </button>

      <Suspense fallback={null}>
        {overlay === 'recruiter' && <RecruiterMode onClose={close} />}
        {overlay === 'terminal' && <Terminal onClose={close} />}
        {askOpen && <AskRaj onClose={close} />}
      </Suspense>
    </div>
  );
}
