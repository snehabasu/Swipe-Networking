"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/lib/types/swipe";
import { User } from "lucide-react";

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    title: "",
    company: "",
    location: "",
    headline: "",
    summary: "",
    linkedinUrl: "",
  });

  const handleSubmit = () => {
    if (!profile.name || !profile.title) {
      setError("Please fill in at least your name and title.");
      return;
    }
    onComplete(profile);
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          Set up your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            profile
          </span>
        </h1>
        <p className="text-muted-foreground">
          We&apos;ll use your background to craft messages that showcase your
          value
        </p>
      </div>

      <Card className="w-full border-2">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-blue-600" />
            <Label className="text-base font-semibold">Your Details</Label>
          </div>

          <div className="grid gap-3">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Product Manager"
                value={profile.title}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g., Acme Corp"
                value={profile.company}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, company: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                placeholder="Your LinkedIn headline"
                value={profile.headline}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, headline: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="summary">About / Summary</Label>
              <textarea
                id="summary"
                placeholder="Brief summary of your experience, skills, and what you bring to the table..."
                value={profile.summary}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, summary: e.target.value }))
                }
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourname"
                value={profile.linkedinUrl}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, linkedinUrl: e.target.value }))
                }
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
