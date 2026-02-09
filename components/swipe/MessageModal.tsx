"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import { Profile } from "@/lib/types/swipe";
import { Copy, Check, X, Sparkles, Loader2, ExternalLink } from "lucide-react";
import { useState } from "react";

interface MessageModalProps {
  profile: Profile;
  message: string;
  isLoading: boolean;
  onClose: () => void;
}

export function MessageModal({
  profile,
  message,
  isLoading,
  onClose,
}: MessageModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-card border-2 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <ProfileAvatar
              initials={profile.initials}
              gradient={profile.avatarGradient}
              size="sm"
            />
            <div>
              <p className="font-semibold text-sm">{profile.name}</p>
              <p className="text-xs text-muted-foreground">
                {profile.title} at {profile.company}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Message Content */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin absolute -bottom-1 -right-1" />
              </div>
              <p className="text-sm text-muted-foreground">
                Generating personalized message...
              </p>
            </div>
          ) : (
            <div className="rounded-xl bg-muted/50 p-4 border">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="flex flex-col gap-2 p-4 pt-0">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={async () => {
                await navigator.clipboard.writeText(message);
                window.open(profile.linkedinUrl, "_blank");
                onClose();
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Send on LinkedIn
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Continue Swiping
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Message copied to clipboard. Paste it on their LinkedIn profile.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
