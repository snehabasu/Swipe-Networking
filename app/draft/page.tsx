"use client";

import { useState, useEffect } from "react";
import { LikedProfile } from "@/lib/types/swipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Pencil,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const LIKED_PROFILES_KEY = "swipeconnect_liked_profiles";

export default function DraftPage() {
  const [drafts, setDrafts] = useState<LikedProfile[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LIKED_PROFILES_KEY);
      if (saved) {
        setDrafts(JSON.parse(saved));
      }
    } catch {
      // invalid data
    }
  }, []);

  const handleCopy = async (id: string, message: string) => {
    await navigator.clipboard.writeText(message);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = drafts.filter((d) => d.profile.id !== id);
    setDrafts(updated);
    localStorage.setItem(LIKED_PROFILES_KEY, JSON.stringify(updated));
  };

  const handleStartEdit = (id: string, message: string) => {
    setEditingId(id);
    setEditText(message);
  };

  const handleSaveEdit = (id: string) => {
    const updated = drafts.map((d) =>
      d.profile.id === id ? { ...d, message: editText } : d
    );
    setDrafts(updated);
    localStorage.setItem(LIKED_PROFILES_KEY, JSON.stringify(updated));
    setEditingId(null);
  };

  const handleSendOnLinkedIn = async (
    linkedinUrl: string,
    message: string
  ) => {
    await navigator.clipboard.writeText(message);
    window.open(linkedinUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Draft Messages</h1>
          <p className="text-muted-foreground mt-1">
            {drafts.length} saved message{drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/swipe">Discover More</Link>
        </Button>
      </div>

      {drafts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <MessageSquare className="w-12 h-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">No drafts yet</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Swipe right on profiles to generate personalized messages
              </p>
            </div>
            <Button asChild>
              <Link href="/swipe">Start Swiping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <Card key={draft.profile.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Profile header */}
                <div className="flex items-center gap-3 p-4 border-b">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${draft.profile.avatarGradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  >
                    {draft.profile.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">
                      {draft.profile.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {draft.profile.title} at {draft.profile.company}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-red-500"
                    onClick={() => handleDelete(draft.profile.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Message */}
                <div className="p-4">
                  {editingId === draft.profile.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={6}
                        autoFocus
                        className="w-full rounded-lg bg-muted/50 p-3 border text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(draft.profile.id)}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                      {draft.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {editingId !== draft.profile.id && (
                  <div className="flex items-center gap-2 px-4 pb-4">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() =>
                        handleSendOnLinkedIn(
                          draft.profile.linkedinUrl,
                          draft.message
                        )
                      }
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Send on LinkedIn
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleCopy(draft.profile.id, draft.message)
                      }
                    >
                      {copiedId === draft.profile.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStartEdit(draft.profile.id, draft.message)
                      }
                    >
                      <Pencil className="w-3.5 h-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
