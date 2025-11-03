## JobTracker
JobTracker is a full-stack web application that helps users organize and track their job applications in one place. It allows users to add, edit, and manage applications efficiently with a clean interface and responsive design.

## 🚀 Features

- Add, edit, and delete job applications
- Track application status (Applied, Interview, Offer, Rejected, etc.)
- Filter and search through job listings
- Secure authentication and authorization
- Form validation across all pages
- User-specific data storage
- Responsive layout for all devices

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT (JSON Web Token)  
**State Management:** Context API  


## 📂 Folder Structure

JobTracker/  
│  
├── frontend/** # Frontend (React)  
│ ├── src/  
│ └── public/  
│  
├── backend/ # Backend (Express)  
│ └── src/  
│   ├── controller/  
│   ├── models/  
│   ├── routes/  
│   ├── db/
│   └── services/  
│  
└── README.md  

## ⚙️ Installation and Setup

- Clone the repository: git clone https://github.com/Lakshay-hub-design/JobTracker.git
- Navigate into the project: cd JobTracker
- Install dependencies for both client and server:
  - cd frontend && npm install
  - cd backend && npm install
- Create a .env file in the server folder and add the following:
  - MONGO_URI=your_mongodb_connection_string
  - JWT_SECRET=your_secret_key
- Run both frontend and backend

## 📧 Contact

Author: Lakshay Sharma  
Email: lakshay0328@gmail.com  
GitHub: Lakshay-hub-design  
