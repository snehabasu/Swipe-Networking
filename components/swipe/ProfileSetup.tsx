"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/lib/types/swipe";
import { Loader2, Linkedin, ChevronDown, ChevronUp } from "lucide-react";

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [manualProfile, setManualProfile] = useState<UserProfile>({
    name: "",
    title: "",
    company: "",
    location: "",
    headline: "",
    summary: "",
    linkedinUrl: "",
  });

  const handleFetchProfile = async () => {
    if (!linkedinUrl.includes("linkedin.com/in/")) {
      setError("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/fetch-linkedin-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch profile");
        setShowManual(true);
        return;
      }

      onComplete(data.profile);
    } catch {
      setError("Failed to connect. Please enter your details manually.");
      setShowManual(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualProfile.name || !manualProfile.title) {
      setError("Please fill in at least your name and title.");
      return;
    }
    onComplete({ ...manualProfile, linkedinUrl });
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

      {/* LinkedIn URL input */}
      <Card className="w-full border-2">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Linkedin className="w-5 h-5 text-blue-600" />
            <Label className="text-base font-semibold">
              Import from LinkedIn
            </Label>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="https://linkedin.com/in/yourname"
              value={linkedinUrl}
              onChange={(e) => {
                setLinkedinUrl(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleFetchProfile()}
            />
            <Button onClick={handleFetchProfile} disabled={isLoading || !linkedinUrl}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Import"
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Manual entry toggle */}
      <button
        onClick={() => setShowManual(!showManual)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {showManual ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        Or enter details manually
      </button>

      {/* Manual entry form */}
      {showManual && (
        <Card className="w-full border-2">
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-3">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={manualProfile.name}
                  onChange={(e) =>
                    setManualProfile((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Product Manager"
                  value={manualProfile.title}
                  onChange={(e) =>
                    setManualProfile((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="e.g., Acme Corp"
                  value={manualProfile.company}
                  onChange={(e) =>
                    setManualProfile((p) => ({ ...p, company: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  placeholder="Your LinkedIn headline"
                  value={manualProfile.headline}
                  onChange={(e) =>
                    setManualProfile((p) => ({
                      ...p,
                      headline: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="summary">About / Summary</Label>
                <textarea
                  id="summary"
                  placeholder="Brief summary of your experience and what you bring to the table..."
                  value={manualProfile.summary}
                  onChange={(e) =>
                    setManualProfile((p) => ({ ...p, summary: e.target.value }))
                  }
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleManualSubmit}>
              Continue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
