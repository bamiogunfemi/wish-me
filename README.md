# Birthday Wishes Web App - Wish Me

A full-stack application for creating birthday celebrations and collecting heartfelt wishes from friends and family. Users can:

- **Create** a birthday page (with an optional image).
- **View** a list of all birthdays.
- **Add** wishes to each birthday.
- **Share** the birthday page via email invites.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technologies Used](#technologies-used)
3. [Environment Setup](#environment-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the App Concurrently](#running-the-app-concurrently)
7. [Project Features](#project-features)
8. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
9. [License](#license)

---

## Project Structure

```bash
Birthday-wishes/
├─ backend/
│  ├─ controllers/
│  │   ├─ birthdayController.js
│  │   ├─ wishController.js
│  │   └─ shareController.js
│  ├─ models/
│  │   ├─ Birthday.js
│  │   └─ Wish.js
│  ├─ routes/
│  │   ├─ birthdayRoutes.js
│  │   ├─ wishRoutes.js
│  │   └─ shareRoutes.js
│  ├─ config/
│  │   ├─ db.js
│  │   └─ cloudinary.js
│  ├─ server.js
│  ├─ package.json
│  └─ .env
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │   ├─ components/
│  │   │   ├─ Layout.jsx
│  │   │   ├─ BirthdaysList.jsx
│  │   │   ├─ BirthdayPage.jsx
│  │   │   ├─ CreateBirthday.jsx
│  │   │   └─ ...
│  │   ├─ App.jsx
│  │   ├─ main.jsx
│  │   └─ index.css
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  └─ vite.config.js
└─ README.md (this file)
```

---

## Technologies Used

- **Frontend**

  - [React](https://reactjs.org/) (Vite-based)
  - [Tailwind CSS](https://tailwindcss.com/) (with dark mode)
  - [Flowbite](https://flowbite.com/) component library
  - JavaScript ES6+

- **Backend**

  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
  - [Mongoose](https://mongoosejs.com/) for MongoDB
  - [Nodemailer](https://nodemailer.com/) for sending emails
  - [Cloudinary](https://cloudinary.com/) (optional) for image uploads

- **Database**

  - [MongoDB](https://www.mongodb.com/) (local or hosted on MongoDB Atlas)

- **Other**
  - [Nodemon](https://github.com/remy/nodemon) for live-reload dev server
  - [dotenv](https://github.com/motdotla/dotenv) for environment variables
  - [concurrently](https://www.npmjs.com/package/concurrently) for running frontend & backend together

---

## Environment Setup

1. **Install Node.js** (version 16+ recommended).
2. **Install MongoDB** (if using locally) or set up a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.
3. **(Optional) Set up Cloudinary** if you want to store images there.
4. **Create an `.env`** in the backend folder for keys like:
   - `MONGO_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `EMAIL_USER`, `EMAIL_PASS` (if using Nodemailer with Gmail)
   - `BIRTHDAY_APP_URL` (your frontend URL)
   - `PORT=5500` (or any free port)

Example `.env`:

```bash
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mydb
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456
CLOUDINARY_API_SECRET=abcdef
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=xxxx16charpass
BIRTHDAY_APP_URL=http://localhost:5173
PORT=5500
```

---

## Backend Setup

1. In the `backend/` folder:
   ```bash
   cd birthday-wishes/backend
   npm install
   npm run dev
   ```
2. Your backend will run at **`http://localhost:5500`** (by default).
3. **Key Backend Files**:
   - `server.js` — main entry point, sets up Express and routes.
   - `controllers/` — e.g. `birthdayController.js`, `wishController.js`, `shareController.js`.
   - `models/` — Mongoose schemas (`Birthday.js`, `Wish.js`).
   - `routes/` — Express routers (`birthdayRoutes.js`, etc.).
   - `config/` — DB config and optional Cloudinary setup.

---

## Frontend Setup

1. In the `frontend/` folder:
   ```bash
   cd birthday-wishes/frontend
   npm install
   npm run dev
   ```
2. By default, Vite dev server runs at **`http://localhost:5173`**.
3. **Key Frontend Files**:
   - `BirthdaysList.jsx` (lists birthdays)
   - `BirthdayPage.jsx` (details and wishes)
   - `CreateBirthday.jsx` (form to create birthdays)
   - `Layout.jsx` (navbar, dark mode toggle)
   - `tailwind.config.js` with `darkMode: 'class'` and `.dark` toggling for pure-black backgrounds if desired.

---

## Running the App Concurrently

If you prefer a single command to run both servers:

1. In the **root** `birthday-wishes/` folder, create/update `package.json`:
   ```json
   {
     "private": true,
     "scripts": {
       "install-deps": "npm install --prefix frontend && npm install --prefix backend",
       "client": "npm run dev --prefix frontend",
       "server": "npm run dev --prefix backend",
       "dev": "concurrently \"npm run client\" \"npm run server\""
     },
     "devDependencies": {
       "concurrently": "^7.6.0"
     }
   }
   ```
2. Then:
   ```bash
   npm run install-deps
   npm run dev
   ```
   - Frontend on **`localhost:5173`**
   - Backend on **`localhost:5500`**

---

## Project Features

1. **Create Birthday**

   - Submit a name and optional image (stored on Cloudinary).

2. **List Birthdays**

   - Displays all birthdays with images, each linking to its detail page.

3. **Birthday Detail**

   - Shows birthday’s info plus all wishes.
   - **Side drawer** to add a new wish.

4. **Share by Email**

   - Another side drawer to send email invites (via Nodemailer) to a list of addresses.
   - The email includes the birthday page link.

5. **Dark Mode**

   - Navbar toggle, preference stored in `localStorage`.
   - Tailwind’s `darkMode: 'class'`, set `.dark` on `<html>`.

6. **Responsive Design**
   - Mobile-friendly layout thanks to Tailwind classes.

---

## Common Issues & Troubleshooting

1. **MongoDB Connection**

   - Check `MONGO_URI`. For Atlas, ensure you whitelist your IP or set `0.0.0.0/0` (for dev).

2. **Cloudinary Upload Failures**

   - Verify your environment variables (`CLOUDINARY_*`).
   - Catch/log full errors to see if it’s a “Request Timeout” or “Invalid credentials.”

3. **Email (Nodemailer) Problems**

   - Gmail requires an **App Password** if you use 2FA.
   - Check logs for invalid login or timeouts.

4. **Dark Mode**

   - Make sure to add/remove `.dark` from `<html>` element.
   - Avoid mixing direct `bg-black` with `dark:bg-*` utilities.

5. **Hot Module Reload (Vite HMR) Not Working**
   - On Windows + WSL, try `--host 0.0.0.0` or `CHOKIDAR_USEPOLLING=true npm run dev`.

---

## License

This project is open-sourced under the [MIT License](LICENSE).
