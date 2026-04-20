# 🤖 PromptGPT - AI Conversational Assistant

PromptGPT is a full-stack AI-powered chat application built with **React (Vite)** and **Node.js**. It features a modern interface similar to ChatGPT, supporting real-time AI interactions, chat history management, and syntax highlighting for code blocks.

---

## ✨ Features

- **Real-time AI Chat:** Powered by advanced AI models to provide intelligent responses.
- **Typewriter Effect:** Smooth, word-by-word streaming animation for AI replies.
- **Syntax Highlighting:** Beautifully formatted code blocks using `rehype-highlight`.
- **Chat Management:** Create, view, and delete previous chat threads via the sidebar.
- **Context API:** Global state management for seamless user experience across components.
- **Modern UI:** Responsive design with a sidebar and professional profile settings.

---

## 🛠️ Tech Stack

### Frontend:
* **React.js (Vite)**
* **Context API** (State Management)
* **React Markdown** (Rendering Markdown)
* **Rehype Highlight** (Code Formatting)
* **FontAwesome** (Icons)

### Backend:
* **Node.js**
* **Express.js**
* **REST API**
* **UUID** (Thread Identification)

---

## 📂 Project Structure

```text
PromptGPT/
├── Backend/
│   ├── routes/          # API Route handlers (chat.js)
│   ├── models/          # Database models (if applicable)
│   ├── utils/           # Helper functions
│   └── server.js        # Main entry point for the server
└── Frontend/
    ├── src/
    │   ├── components/  # Sidebar, Chatwindow, Chat
    │   ├── MyContext/   # Context API configuration
    │   └── App.jsx      # Main application component

1. Clone the repository

Git clone[ https://github.com/Abanisikder/PromptGpt.git]
cd PromptGPT
2. Backend Setup
cd Backend
npm install
# Add your API keys in a .env file
npm start
3. Frontend Setup

cd Frontend
npm install
npm run dev

⚙️ Environment Variables
PORT=8080
AI_API_KEY=your_api_key_here


