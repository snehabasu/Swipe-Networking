import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Networking Made Simple
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Swipe through AI-generated networking messages tailored to your goals. 
              Connect with professionals effortlessly and authentically.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/draft">
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/history">
                View History
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardContent className="pt-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">AI-Generated Drafts</h3>
              <p className="text-muted-foreground">
                Claude AI creates personalized, professional networking messages based on your context and goals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardContent className="pt-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Swipe to Choose</h3>
              <p className="text-muted-foreground">
                Quickly swipe through multiple message options and pick the one that resonates with you.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardContent className="pt-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Track History</h3>
              <p className="text-muted-foreground">
                Keep track of all your sent messages and follow up with your connections.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <div className="space-y-6 text-left">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-lg">Enter Contact Information</h4>
                <p className="text-muted-foreground">
                  Provide the person's name, company, role, and your networking goal.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-lg">AI Generates Options</h4>
                <p className="text-muted-foreground">
                  Claude AI creates 5 unique, personalized message drafts for you.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-lg">Swipe & Send</h4>
                <p className="text-muted-foreground">
                  Swipe through the options, choose your favorite, and send it with confidence.
                </p>
              </div>
            </div>
          </div>
          
          <Button size="lg" className="mt-8" asChild>
            <Link href="/draft">
              Start Networking Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
