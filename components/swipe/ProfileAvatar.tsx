"use client";

import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  initials: string;
  gradient: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-16 h-16 text-xl",
  lg: "w-24 h-24 text-3xl",
};

export function ProfileAvatar({
  initials,
  gradient,
  size = "md",
}: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold shadow-md",
        gradient,
        sizeClasses[size]
      )}
    >
      {initials}
    </div>
  );
}
