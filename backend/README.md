# Anime Checklist API Backend

## API Overview
This is the backend API for the Anime Checklist application. It provides CRUD operations for managing a list of anime using Express and MongoDB.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Jest (unit/integration/API testing)
- Supertest (API testing)

## How to Run

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Start the server
```bash
npm run dev
```

### 3. Run tests
```bash
npm test
```

### 4. Run tests with coverage
```bash
npm run test:coverage
```

## Testing Frameworks/Tools
- Jest
- Supertest

## API Endpoints
- `GET /api/anime` - List all anime
- `POST /api/anime` - Add a new anime
- `PUT /api/anime/:id` - Update an anime
- `DELETE /api/anime/:id` - Delete an anime

## Test Coverage
After running `npm run test:coverage`, a coverage report will be generated in the `coverage/` folder.

**Screenshot Example:**
![Test Coverage Screenshot](../Screenshot%202025-06-21%20223342.png)

---
