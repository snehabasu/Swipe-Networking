export type ProfileCategory = "founders" | "product";

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
