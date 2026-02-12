"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Profile, ProfileCategory } from "@/lib/types/swipe";
import { parseConnectionsCsv } from "@/lib/parse-connections-csv";
import { Upload, FileText, Users, Briefcase, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionsUploadProps {
  onProfilesReady: (profiles: Profile[]) => void;
}

export function ConnectionsUpload({ onProfilesReady }: ConnectionsUploadProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProfileCategory | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const founderCount = profiles.filter((p) => p.category === "founders").length;
  const productCount = profiles.filter((p) => p.category === "product").length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const parsed = parseConnectionsCsv(csvText);

        if (parsed.length === 0) {
          setError(
            "No founders or product leads found in your connections. Make sure the CSV has Position data."
          );
          return;
        }

        setProfiles(parsed);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to parse CSV file."
        );
      }
    };
    reader.readAsText(file);
  };

  const handleStart = () => {
    if (!selectedCategory) return;
    const filtered = profiles.filter((p) => p.category === selectedCategory);
    onProfilesReady(filtered);
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          Upload your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            connections
          </span>
        </h1>
        <p className="text-muted-foreground">
          Export your connections from LinkedIn and upload the CSV to find
          founders and product leads in your network
        </p>
      </div>

      {/* Upload area */}
      <Card
        className={cn(
          "w-full border-2 border-dashed cursor-pointer transition-colors",
          profiles.length > 0
            ? "border-green-400 bg-green-50/50 dark:bg-green-950/20"
            : "hover:border-blue-300 dark:hover:border-blue-700"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-8 flex flex-col items-center gap-3 text-center">
          {profiles.length > 0 ? (
            <>
              <FileText className="w-10 h-10 text-green-500" />
              <div>
                <p className="font-semibold">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  Found {profiles.length} relevant connections
                </p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground" />
              <div>
                <p className="font-semibold">
                  Drop your Connections.csv here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  LinkedIn &rarr; Settings &rarr; Data Privacy &rarr; Get a copy
                  of your data &rarr; Connections
                </p>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-start gap-2 text-sm text-red-500 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Category selection - shown after upload */}
      {profiles.length > 0 && (
        <>
          <div className="text-center">
            <p className="font-medium">Who do you want to connect with?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Card
              className={cn(
                "cursor-pointer border-2 transition-all duration-200 hover:shadow-md",
                selectedCategory === "founders"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md"
                  : "hover:border-gray-300 dark:hover:border-gray-600",
                founderCount === 0 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => founderCount > 0 && setSelectedCategory("founders")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Founders & Chiefs of Staff
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {founderCount} found in your network
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "cursor-pointer border-2 transition-all duration-200 hover:shadow-md",
                selectedCategory === "product"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 shadow-md"
                  : "hover:border-gray-300 dark:hover:border-gray-600",
                productCount === 0 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => productCount > 0 && setSelectedCategory("product")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Product Leads</h3>
                  <p className="text-sm text-muted-foreground">
                    {productCount} found in your network
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            size="lg"
            className="w-full sm:w-auto px-8"
            disabled={!selectedCategory}
            onClick={handleStart}
          >
            Start Swiping
          </Button>
        </>
      )}
    </div>
  );
}
