# Education Management System

A full-stack Education Management System built with React, TypeScript, Node.js, Express, and MongoDB. The application provides role-specific dashboards for administrators, teachers, and students, along with academic management, real-time messaging, and AI-powered chat assistance.

## Features

### Role-Based Dashboards

- **Admin Dashboard:** Manage students, teachers, classes, subjects, enrollments, exams, fees, and notices.
- **Teacher Dashboard:** Access student information, attendance, and marks.
- **Student Dashboard:** View profile, attendance, and marks.
- Protected frontend routes based on authentication status and user role.

### Authentication and Security

- User registration and login.
- Password hashing with bcryptjs.
- JWT-based authentication.
- Token verification middleware for protected backend routes.
- Account status validation during login.
- Student registration linked to an existing student record.
- Admin self-registration is restricted.

### Academic Management

- Student and teacher management.
- Class and subject management.
- Student enrollments.
- Attendance management.
- Examination and marks management.
- Fee management.
- Notice management.

### Real-Time Chat

- Real-time communication using Socket.IO.
- User-specific chat rooms.
- Online and offline presence events.
- Message persistence using MongoDB.
- Separate backend and frontend Socket.IO integration.

### AI Chat Assistant

- Google Gemini AI integration using the `@google/genai` SDK.
- Streaming AI responses.
- In-memory chat sessions associated with user IDs.
- Express API integration for AI conversations.

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Socket.IO Client
- TanStack React Table
- Radix UI and shadcn-related packages
- React Markdown
- Lucide React

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Zod
- Socket.IO
- Google Gemini AI
- dotenv
- CORS

## Project Structure

```text
Education-Management/
├── Backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── student/
│   │   │   ├── teachers/
│   │   │   ├── attendance/
│   │   │   ├── fees/
│   │   │   ├── classes/
│   │   │   ├── subjects/
│   │   │   ├── exams/
│   │   │   ├── enrollments/
│   │   │   ├── marks/
│   │   │   ├── notices/
│   │   │   ├── chat/
│   │   │   └── ai/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── Frontend/
    └── Education Management/
        ├── src/
        │   ├── components/
        │   ├── data/
        │   ├── layouts/
        │   ├── pages/
        │   │   ├── admin/
        │   │   ├── teacher/
        │   │   ├── student/
        │   │   └── auth/
        │   ├── routes/
        │   ├── App.tsx
        │   └── main.tsx
        └── package.json
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB instance, local or hosted
- Google Gemini API key for AI chat functionality

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SaubhagyaSinghRana/Education-Management.git
cd Education-Management
```

### 2. Configure the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
AI_KEY=your_google_gemini_api_key
```

Replace the example values with your own credentials. Never commit your actual `.env` file or API keys to GitHub.

Start the backend development server:

```bash
npm run dev
```

The server uses port `5000` by default when `PORT` is not configured.

### 3. Configure the Frontend

Open another terminal:

```bash
cd "Frontend/Education Management"
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal.

Configure the frontend API base URL to point to your running backend. If the frontend uses a separate environment variable for the API URL, set it according to the frontend code.

### 4. Build the Project

Backend:

```bash
cd Backend
npm run build
```

Frontend:

```bash
cd "Frontend/Education Management"
npm run build
```

## Backend API Route Groups

The Express server registers the following API prefixes:

| Module | API Prefix |
|---|---|
| Authentication | `/api/auth` |
| Students | `/api/student` |
| Teachers | `/api/teachers` |
| Classes | `/api/class` |
| Subjects | `/api/subject` |
| Attendance | `/api/attendance` |
| Fees | `/api/fees` |
| Exams | `/api/exam` |
| Enrollments | `/api/enrollment` |
| Marks | `/api/marks` |
| Notices | `/api/notice` |
| Chat | `/api/chat` |
| AI Chat | `/api/ai` |

These are route prefixes; individual endpoint paths and request payloads are defined in their respective route files.

## Real-Time Communication

The backend integrates Socket.IO for real-time chat events, including:

- `joinChat`
- `sendMessage`
- `receiveMessage`
- `userOnline`
- `userOffline`

Messages are saved through the chat model before being delivered to the sender and receiver.

## AI Integration

The AI chat module uses the Google Gemini SDK to generate responses. It streams text chunks from the model to the client, allowing the frontend to display responses progressively.

AI functionality requires a valid Gemini API key and appropriate frontend/backend configuration.

## Security Notes

- Keep secrets and credentials in environment variables.
- Use a strong JWT secret.
- Restrict CORS origins in production.
- Validate and authorize requests on the backend; frontend route protection alone is not sufficient.
- Configure production rate limiting and input validation as needed.
- Review Socket.IO authentication and online presence handling before deploying publicly.

## Future Improvements

- Add comprehensive automated tests.
- Improve backend role-based authorization.
- Strengthen chat connection authentication and multi-device online status handling.
- Persist AI conversation history in MongoDB.
- Add production deployment configuration and monitoring.

## Author

**Saubhagya Singh Rana**

GitHub: [SaubhagyaSinghRana](https://github.com/SaubhagyaSinghRana)

---

This project demonstrates full-stack application development, REST API integration, authentication, role-specific navigation, database operations, real-time communication, and AI integration.
