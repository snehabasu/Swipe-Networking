"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ProfileCategory,
  NetworkingGoal,
  NETWORKING_GOALS,
} from "@/lib/types/swipe";
import {
  Users,
  Briefcase,
  TrendingUp,
  Building2,
  Landmark,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PreferenceSelectorProps {
  onSelect: (category: ProfileCategory, goal: NetworkingGoal) => void;
}

const categories = [
  {
    id: "founders" as ProfileCategory,
    icon: Users,
    title: "Founders & Chiefs of Staff",
    description: "CEOs, CTOs, COOs, and Chiefs of Staff at startups",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
    selectedBorder: "border-blue-500 dark:border-blue-400",
    selectedBg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: "product" as ProfileCategory,
    icon: Briefcase,
    title: "Product Leads",
    description: "VPs, Senior PMs, and Group PMs driving product strategy",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
    selectedBorder: "border-purple-500 dark:border-purple-400",
    selectedBg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    id: "vc" as ProfileCategory,
    icon: TrendingUp,
    title: "VCs & Investors",
    description: "Partners and Principals at top venture capital firms",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    selectedBorder: "border-emerald-500 dark:border-emerald-400",
    selectedBg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    id: "consulting" as ProfileCategory,
    icon: Building2,
    title: "Consultants",
    description: "Partners and Managers at MBB and top strategy firms",
    iconBg: "bg-sky-100 dark:bg-sky-900",
    iconColor: "text-sky-600 dark:text-sky-400",
    selectedBorder: "border-sky-500 dark:border-sky-400",
    selectedBg: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    id: "banking" as ProfileCategory,
    icon: Landmark,
    title: "Banking & Finance",
    description: "MDs, VPs, and Associates at bulge bracket and elite boutiques",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-600 dark:text-amber-400",
    selectedBorder: "border-amber-500 dark:border-amber-400",
    selectedBg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    id: "alumni" as ProfileCategory,
    icon: GraduationCap,
    title: "MBA Alumni",
    description: "Recent MBA grads at top companies across industries",
    iconBg: "bg-rose-100 dark:bg-rose-900",
    iconColor: "text-rose-600 dark:text-rose-400",
    selectedBorder: "border-rose-500 dark:border-rose-400",
    selectedBg: "bg-rose-50 dark:bg-rose-950/30",
  },
];

export function PreferenceSelector({ onSelect }: PreferenceSelectorProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProfileCategory | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<NetworkingGoal | null>(null);
  const [step, setStep] = useState<"category" | "goal">("category");

  const handleNext = () => {
    if (step === "category" && selectedCategory) {
      setStep("goal");
    } else if (step === "goal" && selectedCategory && selectedGoal) {
      onSelect(selectedCategory, selectedGoal);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      {step === "category" ? (
        <>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
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
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        cat.iconBg
                      )}
                    >
                      <Icon className={cn("w-5 h-5", cat.iconColor)} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm">{cat.title}</h3>
                      <p className="text-xs text-muted-foreground">
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
            disabled={!selectedCategory}
            onClick={handleNext}
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              What&apos;s your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                goal
              </span>
              ?
            </h1>
            <p className="text-muted-foreground">
              This helps us craft the perfect message tone
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {NETWORKING_GOALS.map((goal) => {
              const isSelected = selectedGoal === goal.id;

              return (
                <Card
                  key={goal.id}
                  className={cn(
                    "cursor-pointer border-2 transition-all duration-200 hover:shadow-md",
                    isSelected
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md"
                      : "hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm">{goal.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep("category")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="flex-1 sm:flex-auto px-8"
              disabled={!selectedGoal}
              onClick={handleNext}
            >
              Start Swiping
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
