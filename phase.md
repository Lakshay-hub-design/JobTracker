🔧 Phase 1: Project Setup (Day 1–2)
Create GitHub Repo

jobtrackr-frontend

jobtrackr-backend

Frontend Setup

Initialize React app with Vite

Install Tailwind CSS, React Router DOM

Install shadcn/ui, lucide-react, framer-motion, react-hook-form

Set up folder structure:

bash
Copy
Edit
/components
/pages
/layout
/utils
/hooks
Backend Setup

Initialize Node.js with Express

Connect MongoDB Atlas

Install dependencies:

bash
Copy
Edit
npm i express mongoose cors dotenv bcryptjs jsonwebtoken multer cloudinary
Setup folder structure:

bash
Copy
Edit
/controllers
/routes
/models
/middleware
🎨 Phase 2: Landing Page UI (Day 3–4)
Build a beautiful landing page:

Hero section (animated heading, call-to-action)

Feature cards (e.g., Track Jobs, Upload Resume, Dashboard)

About / Benefits / Footer

Use:

framer-motion for fade/slide effects

Glassmorphism for cards

Shadcn UI for components

Tailwind for layout & responsiveness

🔐 Phase 3: Auth System (Day 5–6)
Frontend:

Register/Login pages using Shadcn form + Zod validation

Store JWT in localStorage on login

Create Auth Context to manage user state

Backend:

Register/Login endpoints

Hash passwords with bcrypt

Issue JWT on login

Protect routes with auth middleware

📁 Phase 4: Job Tracker CRUD (Day 7–10)
Frontend:

Create Add Job form

Show jobs in card or table view

Edit/Delete job

Backend:

Create Job model

Routes: POST /jobs, GET /jobs, PUT /jobs/:id, DELETE /jobs/:id

Validate input, connect to userId

UI:

Filter by status/type

Search bar

Show applied date, company, notes

📊 Phase 5: Dashboard + Charts (Day 11–13)
Add /dashboard page:

Summary cards: Total Jobs, Interviews, Offers, Rejected

Pie chart: Application status

Bar chart: Jobs by month

Use recharts or chart.js

Backend: Add route to get job stats grouped by month/status

📎 Phase 6: Resume Upload (Day 14–15)
Use Cloudinary or Multer to upload PDF resumes

Add resume upload field to job form

Show Download Resume button on job card

📅 Phase 7: Reminder System (Day 16)
Add follow-up date in job entry

Store it in MongoDB

Show upcoming follow-ups in a sidebar or dashboard section

Bonus: Send email via Node (using nodemailer + cron job)

🎨 Phase 8: Polish UI & UX (Day 17–19)
Add dark mode toggle (useContext)

Add toasts/snackbars for actions

Add loading spinners

Improve mobile responsiveness

Use lucide-react icons

Improve navbar + logout button

🚀 Phase 9: Deployment (Day 20)
Deploy frontend on Vercel

Deploy backend on Render or Railway

MongoDB Atlas for DB

Set up .env for both (JWT secret, DB URI, Cloudinary, etc.)

Add live demo link to your README

✅ Phase 10: Resume Boosters (Optional but Strongly Recommended)
Pagination for job list

Export data to CSV/PDF

Google OAuth login

Admin dashboard (to practice role-based auth)

Push notifications (local or via OneSignal)

Unit test 1–2 APIs with Jest

📌 Folder Overview (Frontend)
css
Copy
Edit
src/
│
├── components/
│   ├── JobCard.jsx
│   ├── Navbar.jsx
│   └── Charts.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Jobs.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── AddJob.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── layout/
│   └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx