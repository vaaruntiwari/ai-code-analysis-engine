# 🚀 Code Analysis Engine

> An AI-powered code reviewer that analyzes your code using **Google Gemini 3.6 Flash** and provides professional feedback, refactored code, and optimization suggestions.

## ✨ Features

- 🧠 AI-powered code review
- 💻 Dark-themed syntax-highlighted editor
- 📄 Markdown-formatted review output
- ⚡ Fast and responsive UI
- 🛡️ Client-side cooldown to prevent spam
- 🚫 Handles HTTP 429 (Rate Limit) errors gracefully

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios
- react-simple-code-editor
- PrismJS
- react-markdown
- rehype-highlight
- CSS3

### Backend
- Node.js
- Express.js
- Google Generative AI SDK (@google/genai)
- dotenv
- cors

---

## 🏗️ Architecture

```text
+----------------+
| React Frontend |
+-------+--------+
        |
        | POST /review
        |
+-------v--------+
| Express Backend|
+-------+--------+
        |
        | Gemini API
        |
+-------v--------+
| Gemini 3.6 Flash|
+----------------+
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/code-analysis-engine.git
cd code-analysis-engine
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run the backend:

```bash
npm run dev
```

### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🔌 API

**POST** `/review`

Request:

```json
{
  "code": "console.log('Hello World');"
}
```

Response:

```json
{
  "review": "AI generated markdown review..."
}
```

---

## 🛡️ Rate Limiting

- Client-side cooldown prevents repeated requests.
- Backend handles HTTP **429** errors with user-friendly messages.

---

## 📸 Screenshots

_Add screenshots here._

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Varun Tiwari**
