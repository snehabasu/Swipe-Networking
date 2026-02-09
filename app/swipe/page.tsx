import { SwipeContainer } from "@/components/swipe/SwipeContainer";

export const metadata = {
  title: "Discover Connections - SwipeConnect",
  description:
    "Swipe through professional profiles and generate personalized networking messages.",
};

export default function SwipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <SwipeContainer />
      </div>
    </div>
  );
}
