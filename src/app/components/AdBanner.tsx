import { Crown, X } from 'lucide-react';
import { useState } from 'react';

interface AdBannerProps {
  onUpgrade: () => void;
}

export default function AdBanner({ onUpgrade }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="mx-4 mb-4">
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-2xl p-4 relative overflow-hidden">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white mb-0.5">Remova os anúncios</p>
            <p className="text-xs text-yellow-200">Upgrade para Premium e desbloqueie analytics</p>
          </div>
          <button
            onClick={onUpgrade}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white text-xs font-bold whitespace-nowrap active:scale-95 transition-transform"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
