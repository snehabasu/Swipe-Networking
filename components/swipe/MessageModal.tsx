"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import { Profile } from "@/lib/types/swipe";
import {
  Copy,
  Check,
  X,
  Sparkles,
  Loader2,
  ExternalLink,
  Pencil,
} from "lucide-react";
import { useState, useEffect } from "react";

interface MessageModalProps {
  profile: Profile;
  message: string;
  isLoading: boolean;
  onClose: (editedMessage?: string) => void;
}

export function MessageModal({
  profile,
  message,
  isLoading,
  onClose,
}: MessageModalProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  useEffect(() => {
    setEditedMessage(message);
  }, [message]);

  const currentMessage = isEditing ? editedMessage : message;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70"
      onClick={() => onClose(isEditing ? editedMessage : undefined)}
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-card border-2 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
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
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onClose(isEditing ? editedMessage : undefined)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Message Content */}
        <div className="p-4 overflow-y-auto flex-1">
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
          ) : isEditing ? (
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              rows={8}
              autoFocus
              className="w-full rounded-xl bg-muted/50 p-4 border text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div
              className="rounded-xl bg-muted/50 p-4 border cursor-pointer hover:border-blue-300 transition-colors group"
              onClick={() => setIsEditing(true)}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {currentMessage}
              </p>
              <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Pencil className="w-3 h-3" />
                Click to edit
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="flex flex-col gap-2 p-4 pt-0 flex-shrink-0">
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Done Editing
              </Button>
            )}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={async () => {
                await navigator.clipboard.writeText(currentMessage);
                window.open(profile.linkedinUrl, "_blank");
                onClose(isEditing ? editedMessage : undefined);
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
              <Button
                variant="outline"
                className="flex-1"
                onClick={() =>
                  onClose(isEditing ? editedMessage : undefined)
                }
              >
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
