# Cookbook AI

> **Turn your cooking videos into structured recipes with AI.**  
> Upload an MP4, and Cookbook AI will automatically extract the ingredients, instructions, and tags — all from your video.

---

## Overview

**Cookbook AI** is a full-stack application that uses **speech-to-text** and **large language models (LLMs)** to generate recipes directly from cooking videos.
It’s designed to make recipe creation effortless — transforming raw footage into ready-to-share, structured recipes with AI assistance.

---


## Key Features

- 🎬 **Video Uploads** — Upload `.mp4` cooking videos directly from your browser.  
- 🗣️ **Speech-to-Text Transcription** — Uses **Whisper** for accurate transcription.  
- 🤖 **Local LLM Integration** — Processes transcripts using **Ollama** to extract structured recipe data.  
- 🧂 **Automatic Recipe Generation** — Ingredients, instructions, and tags extracted via AI.  
- 🧠 **Asynchronous Background Processing** — Videos process in the background with FastAPI’s `BackgroundTasks`.  
- 💾 **Persistent Storage** — Recipes are stored and retrieved from **MongoDB**.  
- 🖥️ **Modern Frontend** — Built with **React** and **Material UI**.  
- ⚙️ **Scalable Backend** — Powered by **FastAPI**, Python, and modular database integration.  

---

## Project Checklist

### ✅ Implemented
- [x] Display for single recipes/all recipes on frontend
- [x] Form for uploading recipes manually
- [x] CRUD API endpoints for recipes
- [x] MongoDB recipe storage and retrieval  
- [x] Video upload endpoint
- [x] Transcription integration
- [x] LLM for NLP post-processing
- [x] Frontend upload page with MP4 validation
- [x] Recipe details page with polling for status updates

### 🚧 In Development
- [ ] User authentication and profiles
- [ ] Upload progress UI/better loading states
- [ ] Better error handling
- [ ] Option to upload or paste a URL for videos
- [ ] Polished frontend UI
- [ ] Night mode toggle

---

## Tech Stack

**Frontend:**
- React (JavaScript)
- Material UI

**Backend:**
- FastAPI (Python)
- Whisper (Speech-to-Text)
- Ollama Gemma3(LLM for NLP)

**Database:**  
- MongoDB  


---