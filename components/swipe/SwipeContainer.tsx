"use client";

import { useState, useCallback, useEffect } from "react";
import { ProfileSetup } from "./ProfileSetup";
import { PreferenceSelector } from "./PreferenceSelector";
import { SwipeStack } from "./SwipeStack";
import {
  ProfileCategory,
  NetworkingGoal,
  Profile,
  LikedProfile,
  UserProfile,
} from "@/lib/types/swipe";
import { getProfilesByCategory } from "@/lib/data/mock-profiles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, RotateCcw } from "lucide-react";

const USER_PROFILE_KEY = "swipeconnect_user_profile";
const LIKED_PROFILES_KEY = "swipeconnect_liked_profiles";

type Phase = "setup" | "preferences" | "swiping" | "complete";

export function SwipeContainer() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [networkingGoal, setNetworkingGoal] = useState<NetworkingGoal | null>(
    null
  );
  const [likedProfiles, setLikedProfiles] = useState<LikedProfile[]>([]);

  // Load saved user profile on mount
  useEffect(() => {
    const saved = localStorage.getItem(USER_PROFILE_KEY);
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
        setPhase("preferences");
      } catch {
        // invalid data, start fresh
      }
    }
  }, []);

  const handleProfileSetup = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    setPhase("preferences");
  }, []);

  const handleCategorySelect = useCallback(
    (category: ProfileCategory, goal: NetworkingGoal) => {
      const filtered = getProfilesByCategory(category);
      setProfiles(filtered);
      setNetworkingGoal(goal);
      setPhase("swiping");
    },
    []
  );

  const handleComplete = useCallback(
    (liked: LikedProfile[]) => {
      setLikedProfiles(liked);
      // Persist liked profiles to localStorage
      try {
        const existing = localStorage.getItem(LIKED_PROFILES_KEY);
        const existingProfiles: LikedProfile[] = existing
          ? JSON.parse(existing)
          : [];
        const merged = [...existingProfiles, ...liked];
        localStorage.setItem(LIKED_PROFILES_KEY, JSON.stringify(merged));
      } catch {
        // fallback: just save current batch
        localStorage.setItem(LIKED_PROFILES_KEY, JSON.stringify(liked));
      }
      setPhase("complete");
    },
    []
  );

  const handleReset = useCallback(() => {
    setPhase("preferences");
    setProfiles([]);
    setLikedProfiles([]);
    setNetworkingGoal(null);
  }, []);

  if (phase === "setup") {
    return <ProfileSetup onComplete={handleProfileSetup} />;
  }

  if (phase === "preferences") {
    return <PreferenceSelector onSelect={handleCategorySelect} />;
  }

  if (phase === "swiping") {
    return (
      <SwipeStack
        profiles={profiles}
        userProfile={userProfile}
        networkingGoal={networkingGoal}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
        <Heart className="w-10 h-10 text-white fill-white" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          You&apos;ve reviewed all profiles!
        </h2>
        <p className="text-muted-foreground">
          You liked{" "}
          <span className="font-semibold text-foreground">
            {likedProfiles.length}
          </span>{" "}
          connection{likedProfiles.length !== 1 ? "s" : ""}
        </p>
      </div>

      {likedProfiles.length > 0 && (
        <div className="w-full space-y-3">
          {likedProfiles.map((liked) => (
            <div
              key={liked.profile.id}
              className="flex items-center gap-3 p-3 rounded-xl border bg-card text-left"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${liked.profile.avatarGradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
              >
                {liked.profile.initials}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {liked.profile.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {liked.profile.title} at {liked.profile.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 w-full">
        <Button variant="outline" className="flex-1" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Swipe Again
        </Button>
        <Button className="flex-1" asChild>
          <Link href="/draft">View Drafts</Link>
        </Button>
      </div>
    </div>
  );
}
