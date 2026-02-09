"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileCategory } from "@/lib/types/swipe";
import { Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PreferenceSelectorProps {
  onSelect: (category: ProfileCategory) => void;
}

const categories = [
  {
    id: "founders" as ProfileCategory,
    icon: Users,
    title: "Founders & Chiefs of Staff",
    description: "CEOs, CTOs, COOs, and Chiefs of Staff at high-growth startups",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
    selectedBorder: "border-blue-500 dark:border-blue-400",
    selectedBg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: "product" as ProfileCategory,
    icon: Briefcase,
    title: "Product Leads",
    description: "VPs of Product, Senior PMs, Group PMs driving product strategy",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
    selectedBorder: "border-purple-500 dark:border-purple-400",
    selectedBg: "bg-purple-50 dark:bg-purple-950/30",
  },
];

export function PreferenceSelector({ onSelect }: PreferenceSelectorProps) {
  const [selected, setSelected] = useState<ProfileCategory | null>(null);

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          Who are you looking to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            connect
          </span>{" "}
          with?
        </h1>
        <p className="text-muted-foreground">
          Choose a category to start discovering profiles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {categories.map((cat) => {
          const isSelected = selected === cat.id;
          const Icon = cat.icon;

          return (
            <Card
              key={cat.id}
              className={cn(
                "cursor-pointer border-2 transition-all duration-200 hover:shadow-md",
                isSelected
                  ? `${cat.selectedBorder} ${cat.selectedBg} shadow-md`
                  : "hover:border-gray-300 dark:hover:border-gray-600"
              )}
              onClick={() => setSelected(cat.id)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center",
                    cat.iconBg
                  )}
                >
                  <Icon className={cn("w-7 h-7", cat.iconColor)} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button
        size="lg"
        className="w-full sm:w-auto px-8"
        disabled={!selected}
        onClick={() => selected && onSelect(selected)}
      >
        Start Swiping
      </Button>
    </div>
  );
}
