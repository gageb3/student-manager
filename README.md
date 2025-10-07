# 🗓 Weekly Schedule App

### Author

**Gage Bays**

### Purpose

The Weekly Schedule App allows users to create, view, update, and delete weekly schedules using a clean, modern interface.
It demonstrates a complete full-stack round trip with persistent data storage using MongoDB Atlas.

---

## 🧠 Overview

This web-based MVC **Single Page Application (SPA)** was built from scratch using Node.js, Express.js, MongoDB, and RESTful APIs.
It supports full CRUD functionality and provides both a traditional form interface and an advanced visual schedule manager.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Atlas)
* RESTful API
* dotenv (for secrets)
* nodemon (for development)
* Bootstrap 5 + custom CSS

---

## 📁 Project Structure

```
student-manager/
│
├── public/
│   ├── index.html
│   ├── schedule-crud.html
│   ├── advanced-schedule-manager.html
│   ├── traditional-forms.html
│   ├── styles.css
│   └── script.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## 🔒 Security

All secrets are stored securely in `.env` and excluded via `.gitignore`.

---

## 🚀 Deployment Instructions

### Local Development

1. Clone the repo

   ```bash
   git clone <your-repo-url>
   cd student-manager
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Add `.env` file with:

   ```
   MONGO_URI=mongodb+srv://gagebays540:14olemiss@cluster0.gmbxzz9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
   PORT=3000
   ```

4. Start server

   ```bash
   npm run dev
   ```

   or

   ```bash
   nodemon server.js
   ```

5. Visit: [http://localhost:3000](http://localhost:3000)

---

### Render Deployment

1. Push your code to GitHub
2. Create a new **Web Service** on [Render.com](https://render.com)
3. Connect your GitHub repo
4. Add the following environment variables in Render:

   ```
   MONGO_URI=mongodb+srv://gagebays540:14olemiss@cluster0.gmbxzz9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
   PORT=3000
   ```
5. Deploy!

---

## 🧩 Features

* Add, edit, delete, and view schedules
* Advanced visual manager (grouped by days)
* Persistent MongoDB data storage
* RESTful CRUD endpoints
* Bootstrap + custom responsive design
* Secure configuration using dotenv

---

## 📬 Pull Request Details

When submitting your **Pull Request (P/R)** to the class repository:

* **Title:** `Gage Bays - Weekly Schedule App Submission`

* **Description:**
  “This P/R adds a complete full-stack Weekly Schedule Application built using Node.js, Express, and MongoDB.
  It demonstrates full CRUD operations, persistent data, dotenv security, and deployment readiness via Render.”

* **Tags:** `Node.js`, `MongoDB`, `CRUD`, `Full-Stack`, `Render`, `Student Project`

* **Comment:**
  “Includes complete app documentation, security setup, and full end-to-end CRUD demonstration. Do not merge—submitted for grading.”

---

## 🏁 Attribution

Developed by **Gage Bays** for educational purposes — Web Programming (Full Stack) Course.
