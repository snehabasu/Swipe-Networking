# Networking Swipe Agent

AI-powered networking assistant that generates personalized outreach messages and allows you to swipe through options to find the perfect message.

## Features

- 🤖 **AI-Generated Drafts**: Claude AI creates personalized networking messages
- 👆 **Swipe Interface**: Quickly browse through multiple message options
- 📊 **Message History**: Track all your sent messages and connections
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI**: Anthropic Claude API
- **Database**: Supabase (planned)
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/snehabasu/Swipe-Networking.git
cd networking-swipe-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Anthropic API key and Supabase credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
networking-swipe-agent/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with navbar
│   ├── page.tsx           # Landing page
│   ├── draft/             # Draft generation & swiping
│   └── history/           # Sent messages history
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
└── .env.local            # Environment variables (not committed)
```

## Development Roadmap

### Week 1: Foundation ✅
- [x] Next.js setup with TypeScript & Tailwind
- [x] Install dependencies (shadcn-ui, framer-motion, Anthropic SDK)
- [x] Basic layout with navbar
- [x] Landing page with hero section
- [ ] Message draft generation API
- [ ] Swipeable card component

### Week 2: Core Features (Coming Soon)
- [ ] Message form component
- [ ] Supabase integration
- [ ] History tracking
- [ ] API routes for saving/retrieving messages

## Environment Variables

Create a `.env.local` file with the following:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

