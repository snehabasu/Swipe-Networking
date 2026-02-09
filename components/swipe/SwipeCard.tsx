"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { ProfileAvatar } from "./ProfileAvatar";
import { Profile, SwipeDirection } from "@/lib/types/swipe";
import { MapPin, Users } from "lucide-react";

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: SwipeDirection) => void;
  isTop: boolean;
  stackIndex: number;
}

export function SwipeCard({
  profile,
  onSwipe,
  isTop,
  stackIndex,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  const rightOverlayOpacity = useTransform(x, [0, 80, 200], [0, 0.15, 0.4]);
  const leftOverlayOpacity = useTransform(x, [-200, -80, 0], [0.4, 0.15, 0]);
  const likeStampOpacity = useTransform(x, [0, 60, 120], [0, 0.4, 1]);
  const nopeStampOpacity = useTransform(x, [-120, -60, 0], [1, 0.4, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 120;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  const stackScale = 1 - stackIndex * 0.05;
  const stackY = stackIndex * 12;
  const stackOpacity = 1 - stackIndex * 0.15;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        zIndex: 3 - stackIndex,
      }}
      initial={false}
      animate={{
        scale: stackScale,
        y: stackY,
        opacity: stackOpacity,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={`w-full h-full rounded-2xl border-2 bg-card shadow-xl overflow-hidden select-none ${
          isTop ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        style={isTop ? { x, rotate } : undefined}
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={isTop ? handleDragEnd : undefined}
        whileDrag={{ scale: 1.02 }}
      >
        {/* Green overlay (right swipe) */}
        {isTop && (
          <motion.div
            className="absolute inset-0 bg-green-500/30 dark:bg-green-400/20 rounded-2xl pointer-events-none z-10"
            style={{ opacity: rightOverlayOpacity }}
          />
        )}

        {/* Red overlay (left swipe) */}
        {isTop && (
          <motion.div
            className="absolute inset-0 bg-red-500/30 dark:bg-red-400/20 rounded-2xl pointer-events-none z-10"
            style={{ opacity: leftOverlayOpacity }}
          />
        )}

        {/* LIKE stamp */}
        {isTop && (
          <motion.div
            className="absolute top-8 left-6 z-20 pointer-events-none"
            style={{ opacity: likeStampOpacity }}
          >
            <span className="text-3xl font-extrabold text-green-500 dark:text-green-400 border-4 border-green-500 dark:border-green-400 rounded-lg px-3 py-1 -rotate-12">
              LIKE
            </span>
          </motion.div>
        )}

        {/* NOPE stamp */}
        {isTop && (
          <motion.div
            className="absolute top-8 right-6 z-20 pointer-events-none"
            style={{ opacity: nopeStampOpacity }}
          >
            <span className="text-3xl font-extrabold text-red-500 dark:text-red-400 border-4 border-red-500 dark:border-red-400 rounded-lg px-3 py-1 rotate-12">
              NOPE
            </span>
          </motion.div>
        )}

        {/* Card content */}
        <div className="relative z-0 p-6 flex flex-col h-full">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-4">
            <ProfileAvatar
              initials={profile.initials}
              gradient={profile.avatarGradient}
              size="lg"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-bold truncate">{profile.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {profile.title}
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                {profile.company}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{profile.location}</span>
          </div>

          {/* Headline */}
          <p className="text-sm italic text-muted-foreground mb-3 border-l-2 border-blue-500 pl-3">
            {profile.headline}
          </p>

          {/* Summary */}
          <p className="text-sm leading-relaxed flex-1 line-clamp-4">
            {profile.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{profile.mutualConnections} mutual</span>
            </div>
            <span>
              {profile.connectionDegree === 2 ? "2nd" : "3rd"} degree
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
