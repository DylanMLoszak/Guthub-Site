"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profiles } from "@/lib/profiles";
import {
  ProfileCard,
  type ProfileCardHandle,
  type SwipeDirection,
} from "./ProfileCard";
import { ActionBar } from "./ActionBar";
import { MatchModal } from "./MatchModal";

type SwipeRecord = {
  profileIndex: number;
  direction: SwipeDirection;
};

export function CardStack() {
  const [index, setIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [matchShown, setMatchShown] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [matchProfile, setMatchProfile] = useState<
    (typeof profiles)[number] | null
  >(null);
  const [history, setHistory] = useState<SwipeRecord[]>([]);

  const topCardRef = useRef<ProfileCardHandle | null>(null);
  // Prevents rapid-fire action-bar clicks from hitting an already-swiping card.
  const isSwipingRef = useRef(false);

  // Callback ref for the top card. Skipping null calls is load-bearing: when
  // index advances, the previous top card unmounts and the previously-ghost
  // card promotes in the same React commit. React isn't guaranteed to run
  // the unmount cleanup before the new top's setup, so a naive `ref.current
  // = handle` (or unconditional `ref.current = null` on detach) can leave
  // topCardRef.current null after Jules promotes — which silently no-ops
  // the next action-bar swipe and deadlocks isSwipingRef.
  const setTopCardRef = useCallback((handle: ProfileCardHandle | null) => {
    if (handle) topCardRef.current = handle;
  }, []);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      const swipedProfile = profiles[index];
      if (!swipedProfile) return;

      setHistory((h) => [...h, { profileIndex: index, direction }]);

      if (direction === "right" || direction === "super") {
        setLikeCount((prev) => {
          const next = prev + 1;
          if (next === 3 && !matchShown) {
            setMatchProfile(swipedProfile);
            setShowMatch(true);
            setMatchShown(true);
          }
          return next;
        });
      }

      // Advance index after the throw animation, then unlock for next swipe.
      window.setTimeout(() => {
        setIndex((i) => i + 1);
        isSwipingRef.current = false;
      }, 350);
    },
    [index, matchShown],
  );

  const triggerSwipe = (direction: SwipeDirection) => {
    if (isSwipingRef.current) return;
    isSwipingRef.current = true;
    topCardRef.current?.swipe(direction);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setIndex(last.profileIndex);
    if (last.direction === "right" || last.direction === "super") {
      setLikeCount((c) => Math.max(0, c - 1));
    }
  };

  const reset = () => {
    setIndex(0);
    setLikeCount(0);
    setMatchShown(false);
    setShowMatch(false);
    setMatchProfile(null);
    setHistory([]);
  };

  const exhausted = index >= profiles.length;
  const visible = profiles.slice(index, index + 3);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div
        className="relative"
        style={{
          width: "min(400px, 90vw)",
          height: "min(620px, 140vw)",
          maxHeight: 620,
        }}
      >
        {exhausted ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-ink/20 bg-cream-pale p-10 text-center shadow-card"
          >
            <p
              className="eyebrow text-ink-soft"
              style={{ letterSpacing: "0.3em" }}
            >
              End of the line
            </p>
            <h2
              className="mt-5 font-display text-3xl font-extrabold italic leading-tight text-ink"
              style={{ letterSpacing: "-0.02em" }}
            >
              You&rsquo;ve seen everyone nearby for now.
            </h2>
            <p className="mt-4 max-w-xs text-base text-ink-soft">
              Take a breath. We&rsquo;ll have new people for you tomorrow.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full bg-terracotta px-6 py-3 font-display font-semibold text-cream transition-colors hover:bg-terracotta-deep"
            >
              Start over
            </button>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            {visible
              .slice()
              .reverse()
              .map((profile, reverseIdx) => {
                const stackIdx = visible.length - 1 - reverseIdx;
                const isTop = stackIdx === 0;
                return (
                  <ProfileCard
                    key={profile.id}
                    ref={isTop ? setTopCardRef : undefined}
                    profile={profile}
                    isTop={isTop}
                    index={stackIdx}
                    onSwipe={handleSwipe}
                  />
                );
              })}
          </AnimatePresence>
        )}
      </div>

      {!exhausted && (
        <ActionBar
          onPass={() => triggerSwipe("left")}
          onLike={() => triggerSwipe("right")}
          onSuper={() => triggerSwipe("super")}
          onUndo={handleUndo}
          canUndo={history.length > 0}
        />
      )}

      <MatchModal
        open={showMatch}
        matchProfile={matchProfile}
        onClose={() => setShowMatch(false)}
      />
    </div>
  );
}

export default CardStack;
