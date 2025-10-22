🚀 Konnect — A Minimal Social Media App

Konnect is a simple social media application built to explore and understand modern full-stack development concepts with Next.js 14 App Router, TypeScript, Prisma, PostgreSQL, and Clerk Authentication.

This first version focuses on enabling users to create and view text-based posts, laying the groundwork for future features like image uploads, comments, and real-time updates.

✨ Highlights

🚀 Tech Stack: Next.js App Router, PostgreSQL, Prisma, Clerk, TypeScript

🧩 Architecture: Server Components, Layouts, Route Handlers, Server Actions

🔥 Special Next.js Files: loading.tsx, error.tsx, not-found.tsx

🪄 API Integration using Route Handlers

📡 Data Fetching, Caching & Revalidation

💡 Client & Server Components

🧭 Dynamic & Static Routes

🎨 Styling with Tailwind CSS & Shadcn UI

🔐 Authentication & Authorization via Clerk

🧠 Database Integration with Prisma

📝 Server Actions & Forms

⚡ Optimistic Updates for a smoother UX

🧱 Features (v1)

🗒️ Create and share written posts

👤 Authentication with Clerk

🕒 View posts from other users

🔄 Automatic revalidation and data caching

💫 Clean, minimal UI with Tailwind & Shadcn

🧰 Tech Stack
Category	Technology
Framework	Next.js (App Router)
Language	TypeScript
Database	PostgreSQL
ORM	Prisma
Auth	Clerk
Styling	Tailwind CSS + Shadcn
Deployment	Vercel (recommended)
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/yourusername/konnect.git
cd konnect

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables

Create a .env file in the project root and include:

DATABASE_URL="your_postgres_connection_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

4️⃣ Generate Prisma Client
npx prisma generate

5️⃣ Run the Development Server
npm run dev


Visit http://localhost:3000
 🎉

🧭 Roadmap

🖼️ Image posts

💬 Comments & likes

🕓 Real-time updates (WebSockets / Pusher)

📱 Responsive mobile design

🧑‍🤝‍🧑 User profiles

🧑‍💻 Purpose

This project was built as part of my learning journey to deepen my understanding of:

Full-stack architecture with Next.js App Router

Modern authentication using Clerk

Database schema design and queries with Prisma

Server Actions and optimistic UI updates

📜 License

This project is open source under the MIT License.