export type ProfileCategory =
  | "founders"
  | "product"
  | "vc"
  | "consulting"
  | "banking"
  | "alumni";

export type NetworkingGoal =
  | "informational"
  | "coffee-chat"
  | "job-referral"
  | "startup-advice";

export const NETWORKING_GOALS: {
  id: NetworkingGoal;
  label: string;
  description: string;
  promptHint: string;
}[] = [
  {
    id: "informational",
    label: "Informational Interview",
    description: "Learn about their role, company, or industry",
    promptHint:
      "The sender wants to learn about the recipient's career path, role, and industry insights. Frame as a genuine learning conversation.",
  },
  {
    id: "coffee-chat",
    label: "Coffee Chat",
    description: "Build a casual professional relationship",
    promptHint:
      "The sender wants a relaxed, casual conversation to build rapport. Keep it friendly and low-pressure.",
  },
  {
    id: "job-referral",
    label: "Job Referral",
    description: "Explore opportunities at their company",
    promptHint:
      "The sender is interested in opportunities at the recipient's company. Be tactful — show genuine interest in the company and the recipient's work first, then mention exploring roles.",
  },
  {
    id: "startup-advice",
    label: "Startup Advice",
    description: "Get guidance on building or joining a startup",
    promptHint:
      "The sender wants advice on startups — founding, joining early-stage, or navigating the startup ecosystem. Position as seeking mentorship.",
  },
];

export interface Profile {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  headline: string;
  summary: string;
  category: ProfileCategory;
  mutualConnections: number;
  connectionDegree: 2 | 3;
  initials: string;
  avatarGradient: string;
  linkedinUrl: string;
}

export interface UserProfile {
  name: string;
  title: string;
  company: string;
  location: string;
  headline: string;
  summary: string;
  linkedinUrl: string;
}

export interface LikedProfile {
  profile: Profile;
  message: string;
  likedAt: Date;
}

export type SwipeDirection = "left" | "right";
