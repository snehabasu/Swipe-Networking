"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { SwipeCard } from "./SwipeCard";
import { MessageModal } from "./MessageModal";
import { Profile, LikedProfile, SwipeDirection, UserProfile } from "@/lib/types/swipe";
import { Button } from "@/components/ui/button";
import { Heart, X, RotateCcw } from "lucide-react";

interface SwipeStackProps {
  profiles: Profile[];
  userProfile: UserProfile | null;
  onComplete: (liked: LikedProfile[]) => void;
}

export function SwipeStack({ profiles, userProfile, onComplete }: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<LikedProfile[]>([]);
  const [history, setHistory] = useState<
    { index: number; direction: SwipeDirection }[]
  >([]);
  const [modal, setModal] = useState<{
    profile: Profile;
    message: string;
    isLoading: boolean;
  } | null>(null);

  const generateMessage = useCallback(async (profile: Profile) => {
    try {
      const res = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, userProfile }),
      });
      const data = await res.json();
      return data.message || data.fallback || "Could not generate message.";
    } catch {
      return "Hi! I came across your profile and was really impressed by your work. I'd love to connect and learn more about what you're building. Would you be open to a brief chat sometime?";
    }
  }, [userProfile]);

  const handleSwipe = useCallback(
    async (direction: SwipeDirection) => {
      const profile = profiles[currentIndex];
      if (!profile) return;

      setHistory((prev) => [...prev, { index: currentIndex, direction }]);

      if (direction === "right") {
        setModal({ profile, message: "", isLoading: true });

        const message = await generateMessage(profile);

        setModal({ profile, message, isLoading: false });
        setLikedProfiles((prev) => [
          ...prev,
          { profile, message, likedAt: new Date() },
        ]);
      }

      if (direction === "left") {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= profiles.length) {
            onComplete(likedProfiles);
          }
          return next;
        });
      }
    },
    [currentIndex, profiles, generateMessage, likedProfiles, onComplete]
  );

  const handleModalClose = useCallback(() => {
    setModal(null);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= profiles.length) {
        setTimeout(() => onComplete(likedProfiles), 0);
      }
      return next;
    });
  }, [profiles.length, onComplete, likedProfiles]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(last.index);
    if (last.direction === "right") {
      setLikedProfiles((prev) => prev.slice(0, -1));
    }
  }, [history]);

  const remaining = profiles.length - currentIndex;
  const isComplete = currentIndex >= profiles.length;

  if (isComplete) {
    onComplete(likedProfiles);
    return null;
  }

  const visibleCards = profiles.slice(currentIndex, currentIndex + 3);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          {currentIndex + 1} of {profiles.length}
        </span>
        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / profiles.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-sm h-[480px]">
        {visibleCards
          .map((profile, i) => ({
            profile,
            stackIndex: i,
          }))
          .reverse()
          .map(({ profile, stackIndex }) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              onSwipe={handleSwipe}
              isTop={stackIndex === 0}
              stackIndex={stackIndex}
            />
          ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full w-14 h-14 border-2 border-red-200 hover:bg-red-50 hover:border-red-400 dark:border-red-900 dark:hover:bg-red-950 dark:hover:border-red-700"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-6 h-6 text-red-500" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 border-2"
          onClick={handleUndo}
          disabled={history.length === 0}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full w-14 h-14 border-2 border-green-200 hover:bg-green-50 hover:border-green-400 dark:border-green-900 dark:hover:bg-green-950 dark:hover:border-green-700"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="w-6 h-6 text-green-500" />
        </Button>
      </div>

      {/* Remaining count */}
      <p className="text-xs text-muted-foreground">
        {remaining} profile{remaining !== 1 ? "s" : ""} remaining
      </p>

      {/* Message modal */}
      <AnimatePresence>
        {modal && (
          <MessageModal
            profile={modal.profile}
            message={modal.message}
            isLoading={modal.isLoading}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
