"use client";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { useDrag } from "@use-gesture/react";
import type { Profile } from "@/lib/profiles";

export type SwipeDirection = "left" | "right" | "super";

export type ProfileCardHandle = {
  swipe: (direction: SwipeDirection) => void;
};

type ProfileCardProps = {
  profile: Profile;
  isTop: boolean;
  index: number;
  onSwipe: (direction: SwipeDirection) => void;
};

const SPRING = { type: "spring" as const, stiffness: 280, damping: 26 };
const THROW_EASE: [number, number, number, number] = [0.4, 0, 1, 1];

export const ProfileCard = forwardRef<ProfileCardHandle, ProfileCardProps>(
  function ProfileCard({ profile, isTop, index, onSwipe }, ref) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(
      x,
      [-1200, -260, 0, 260, 1200],
      [-35, -18, 0, 18, 35],
    );
    const opacity = useTransform(
      x,
      [-1200, -600, 0, 600, 1200],
      [0, 1, 1, 1, 0],
    );
    const likeOpacity = useTransform(x, [0, 80, 160], [0, 0.6, 1]);
    const nopeOpacity = useTransform(x, [-160, -80, 0], [1, 0.6, 0]);

    const swipingRef = useRef(false);

    const throwOff = (direction: SwipeDirection) => {
      if (swipingRef.current) return;
      swipingRef.current = true;
      const width =
        typeof window !== "undefined" ? window.innerWidth : 1000;
      const sign = direction === "left" ? -1 : 1;
      const targetX =
        direction === "super" ? 0 : sign * (width + 200);
      const targetY = direction === "super" ? -900 : 0;

      animate(x, targetX, { duration: 0.4, ease: THROW_EASE });
      animate(y, targetY, { duration: 0.4, ease: THROW_EASE });
      onSwipe(direction);
    };

    useImperativeHandle(
      ref,
      () => ({
        swipe: (direction) => throwOff(direction),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const bind = useDrag(
      ({ down, movement: [mx, my], velocity: [vx], direction: [dx] }) => {
        if (!isTop || swipingRef.current) return;
        if (down) {
          x.set(mx);
          y.set(my * 0.4);
          return;
        }
        const passedDistance = Math.abs(mx) > 120;
        const passedVelocity = Math.abs(vx) > 0.4;
        if (passedDistance || passedVelocity) {
          const dir: SwipeDirection =
            (mx === 0 ? dx : mx) > 0 ? "right" : "left";
          throwOff(dir);
        } else {
          animate(x, 0, SPRING);
          animate(y, 0, SPRING);
        }
      },
      { filterTaps: true, pointer: { touch: true } },
    );

    const ghostStyle = useMemo(() => {
      if (index === 1) return { scale: 0.95, y: 16, opacity: 0.7 };
      if (index === 2) return { scale: 0.9, y: 32, opacity: 0.4 };
      return { display: "none" as const };
    }, [index]);

    const dragBind = isTop ? bind() : {};

    return (
      <div
        {...dragBind}
        className={`absolute inset-0 select-none ${
          isTop ? "cursor-grab z-30" : index === 1 ? "z-20" : "z-10"
        }`}
        style={{ touchAction: "none" }}
      >
        <motion.div
          // Top card: drag motion values drive x/y/rotate/opacity via style.
          // animate resets scale+y so a previously-ghosted card snaps back cleanly.
          // Ghost cards: animate drives the offset/scale/opacity, style is unused.
          style={isTop ? { x, y, rotate, opacity } : undefined}
          animate={isTop ? { scale: 1, y: 0 } : ghostStyle}
          transition={SPRING}
          className="relative h-full w-full overflow-hidden rounded-2xl border border-ink/20 bg-cream-pale shadow-card"
        >
          <div className="relative h-[62%] w-full overflow-hidden">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              priority={isTop}
              draggable={false}
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />

            {isTop && (
              <>
                <motion.div
                  style={{ opacity: likeOpacity }}
                  className="pointer-events-none absolute left-5 top-5 -rotate-12 rounded-full bg-terracotta px-5 py-2 font-display text-3xl font-extrabold italic text-cream shadow-card"
                >
                  LIKE
                </motion.div>
                <motion.div
                  style={{ opacity: nopeOpacity }}
                  className="pointer-events-none absolute right-5 top-5 rotate-12 rounded-full border-2 border-oxblood bg-cream-pale/80 px-5 py-2 font-display text-3xl font-extrabold italic text-oxblood shadow-card"
                >
                  NOPE
                </motion.div>
              </>
            )}
          </div>

          <div className="flex h-[38%] flex-col px-6 py-5">
            <h2
              className="font-display text-[2rem] font-extrabold leading-tight text-ink"
              style={{ letterSpacing: "-0.02em" }}
            >
              {profile.name}
              <span className="font-display text-ink-soft">
                <span className="not-italic">, </span>
                <span className="font-normal italic">{profile.age}</span>
              </span>
            </h2>
            <p className="eyebrow mt-1 text-ink-soft">
              {profile.city}
              <span className="mx-2">&middot;</span>
              {profile.occupation}
            </p>

            <div className="my-3 h-px w-full bg-ink/15" />

            <p className="eyebrow text-ink-soft">{profile.prompt.question}</p>
            <p
              className="mt-1.5 line-clamp-4 font-display text-[1.05rem] font-medium italic text-ink"
              style={{ lineHeight: 1.35 }}
            >
              {profile.prompt.answer}
            </p>
          </div>
        </motion.div>
      </div>
    );
  },
);

export default ProfileCard;
