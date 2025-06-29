# 🎌 Anime Checklist - MERN Stack App

Keep track of your favorite anime shows with this full-stack MERN application! **Anime Checklist** is a CRUD-based web app that allows users to manage their anime watchlist with features like adding, updating, deleting, and marking anime as watched.

---

## 🚀 Overview

**Anime Checklist** is built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a seamless experience for anime enthusiasts to:

- Maintain a personal anime watchlist
- Add new anime entries
- Mark anime as watched
- Edit anime details (title, status, rating, notes)
- Remove anime from the list

---

## ✨ Features

- 📥 **Add Anime**: Include new anime titles to your checklist.
- ✅ **Mark as Watched**: Track your watching progress.
- 📝 **Update Anime Info**: Modify details like title, status, or rating.
- ❌ **Delete Anime**: Remove entries from your list.
- 🔁 **Real-Time Updates**: Dynamic UI with React.
- 🔌 **RESTful API**: Powered by Express.js and MongoDB.

---

## 🧪 Tech Stack

- **Frontend**: React, Axios, Bootstrap/Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **API Testing**: Postman, cURL

---

## 🧱 Project Structure

```plaintext
anime-checklist/
│
├── backend/                  # Express + Node API Server
│   ├── models/               # Mongoose data schemas
│   ├── routes/               # API route handlers
│   ├── controllers/          # Logic behind API routes
│   ├── .env                  # Environment variables
│   ├── server.js             # Entry point for backend
│   └── package.json
│
├── frontend/                 # React Web App
│   ├── public/               # Static assets
│   ├── src/                  # React source files
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main application pages
│   │   ├── App.js            # Main React app component
│   │   └── index.js          # React entry point
│   └── package.json
│
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/anime-checklist.git
cd anime-checklist
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

#### Configure `.env`

Create a `.env` file in the `backend` directory with the following:

```ini
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/animeDB
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
npm start
```

The React app will run at `http://localhost:3000`.

### 4. API Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/api/anime`         | Fetch all anime            |
| POST   | `/api/anime`         | Add new anime              |
| PUT    | `/api/anime/:id`     | Update anime details       |
| DELETE | `/api/anime/:id`     | Delete anime from list     |

#### Sample API Request (POST)

```json
POST /api/anime
{
  "title": "Jujutsu Kaisen",
  "status": "Watching",
  "rating": 9
}
```

---

## 🧪 Backend Testing & Coverage

The backend uses **Jest** and **Supertest** for unit, integration, and API endpoint testing.

### Running Tests

1. Go to the backend directory:
   ```bash
   cd backend
   ```
2. Run all tests:
   ```bash
   npm test
   ```
3. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```
   This will generate a coverage report in the `backend/coverage/` folder.

### Testing Frameworks/Tools
- Jest (unit/integration/API testing)
- Supertest (API endpoint testing)

### Test Types
- **Unit Tests:** Test controller logic with and without mocking the database.
- **Integration Tests:** Test the interaction between the API server and the database.
- **API Tests:** Test the API endpoints for correct request/response behavior.

### Example Test Coverage Screenshot
After running the coverage command, a report will be generated. Example:

![Test Coverage Screenshot](image.png)

---

## ✅ To-Do / Future Upgrades

- 🔐 Add user login and authentication
- 🔍 Integrate with MyAnimeList or AniList API for autofill
- 🗂️ Add filters (e.g., completed, watching, dropped)
- 🎨 Support uploading cover images for anime

---

## 📸 Screenshots

![Screenshot1](Screenshot1.png)
---
![Screenshot1](Screenshot2.png)

---

---

## 🧑‍💻 Author

**Abhinav Anand**  
GitHub: [abhi293](https://github.com/abhi293)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
