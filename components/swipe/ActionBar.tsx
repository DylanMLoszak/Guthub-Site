"use client";

import { motion } from "motion/react";
import { Heart, X, Star, RotateCcw } from "lucide-react";

type ActionBarProps = {
  onPass: () => void;
  onLike: () => void;
  onSuper: () => void;
  onUndo: () => void;
  canUndo: boolean;
  disabled?: boolean;
};

export function ActionBar({
  onPass,
  onLike,
  onSuper,
  onUndo,
  canUndo,
  disabled = false,
}: ActionBarProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4 rounded-full border border-ink/20 bg-cream-pale px-5 py-3 shadow-card md:gap-6">
        <motion.button
          type="button"
          aria-label="Undo last swipe"
          onClick={onUndo}
          disabled={!canUndo || disabled}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink-soft transition-colors hover:bg-cream-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <RotateCcw className="h-4 w-4" />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Pass"
          onClick={onPass}
          disabled={disabled}
          whileTap={{ scale: 0.92 }}
          className="group flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-ink bg-cream-pale text-ink transition-colors hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X className="h-6 w-6" strokeWidth={1.75} />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Super like"
          onClick={onSuper}
          disabled={disabled}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-cream transition-colors hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Star className="h-4 w-4" strokeWidth={2} fill="currentColor" />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Like"
          onClick={onLike}
          disabled={disabled}
          whileTap={{ scale: 0.92 }}
          className="group flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-terracotta bg-cream-pale text-terracotta transition-colors hover:bg-terracotta hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Heart className="h-6 w-6" strokeWidth={1.75} />
        </motion.button>
      </div>
      <p className="eyebrow text-ink-soft/70">Drag the card or tap a button.</p>
    </div>
  );
}

export default ActionBar;
