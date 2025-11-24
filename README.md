# ⚽ Player Stats Dashboard - Full Stack Setup

A professional football player management system built with React, Node.js, Express, and MySQL.

---

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

---

## 🚀 Quick Start Guide

### 1️⃣ Database Setup

**Step 1:** Start MySQL and create the database

```bash
mysql -u root -p
```

**Step 2:** Run the setup script

```sql
source setup.sql
```

Or manually copy and paste the SQL commands from `setup.sql`.

**Step 3:** Verify the setup

```sql
USE player_stats_db;
SELECT * FROM players;
```

---

### 2️⃣ Backend Setup

**Step 1:** Create backend directory structure

```bash
mkdir -p backend/routes
cd backend
```

**Step 2:** Create `package.json` (use the provided package.json artifact)

Or initialize manually:
```bash
npm init -y
```

**Step 3:** Install dependencies

```bash
npm install express mysql2 cors body-parser
npm install --save-dev nodemon
```

**Step 4:** Create the three backend files:
- `index.js` - Main server (use artifact)
- `db.js` - Database connection (use artifact)  
- `routes/players.js` - Player routes (use artifact)

**Step 5:** Update MySQL credentials in `db.js`

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD_HERE',  // ⚠️ Change this!
  database: 'player_stats_db',
  // ...
});
```

**Step 6:** Start the server

```bash
npm run dev
```

You should see:
```
✅ Connected to MySQL database
🚀 Server running on http://localhost:3000
```

---

### 3️⃣ Frontend Setup

**Step 1:** Create React app with Vite

```bash
cd ..  # Go back to project root
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

**Step 2:** Install Lucide React for icons

```bash
npm install lucide-react
```

**Step 3:** Create the component files:

```bash
mkdir -p src/components
```

Then create these files using the artifacts:
- `src/App.jsx` - Main app component
- `src/components/PlayerList.jsx` - List view
- `src/components/AddPlayer.jsx` - Add form
- `src/components/EditPlayer.jsx` - Edit form

**Step 4:** Update `src/main.jsx` to import the App

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Step 5:** Ensure Tailwind is configured in `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 6:** Verify API endpoint in all component files

Make sure `API_BASE` is set to:
```javascript
const API_BASE = 'http://localhost:3000/api';
```

**Step 7:** Start the dev server

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players |
| GET | `/api/players/:id` | Get single player |
| POST | `/api/players` | Create new player |
| PUT | `/api/players/:id` | Update player |
| DELETE | `/api/players/:id` | Delete player |

### Example API Calls

**Create Player:**
```bash
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lionel Messi",
    "position": "RW",
    "rating": 91,
    "club": "Inter Miami",
    "nation": "Argentina"
  }'
```

**Update Player:**
```bash
curl -X PUT http://localhost:3000/api/players/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kylian Mbappé",
    "position": "ST",
    "rating": 92,
    "club": "Real Madrid",
    "nation": "France"
  }'
```

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── index.js                 # Main server file
│   ├── db.js                    # MySQL connection pool
│   ├── routes/
│   │   └── players.js           # Player CRUD routes
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlayerList.jsx   # Main list view with filters
│   │   │   ├── AddPlayer.jsx    # Add player form
│   │   │   └── EditPlayer.jsx   # Edit player form
│   │   ├── App.jsx              # Root component with routing
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── node_modules/
└── setup.sql                    # Database schema and seed data
```

---

## 🎨 Features

✅ **CRUD Operations** - Create, Read, Update, Delete players  
✅ **Real-time Filtering** - By position, rating, and nation  
✅ **Search Functionality** - Search by name or club  
✅ **Stats Dashboard** - View aggregate statistics  
✅ **Clean UI** - Modern, EA-inspired design  
✅ **Responsive** - Works on all screen sizes  

---

## 🔍 Troubleshooting

### Database Connection Issues
- Check MySQL is running: `sudo systemctl status mysql`
- Verify credentials in `server.js`
- Ensure database exists: `SHOW DATABASES;`

### CORS Errors
- Verify backend is running on port 3000
- Check `API_BASE` URL in frontend matches backend

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 🚀 Next Steps (Optional Enhancements)

- Add **authentication** with JWT
- Implement **pagination** for large datasets
- Add **image uploads** for player photos
- Create **advanced analytics** dashboard
- Add **export to CSV/PDF** functionality
- Implement **real-time updates** with WebSockets

---

## 📝 License

MIT License - feel free to use this for your portfolio or EA interview!

---

**Built with ❤️ for EA Sports FC**
