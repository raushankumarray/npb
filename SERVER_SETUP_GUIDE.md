# NPB Media – Server Setup Guide (Step by Step)

Easy guide to install and run the NPB Media website server on your computer and make it live online.

---

## Part 1: Run on Your Computer (Local)

### Step 1: Install Node.js

1. Go to **https://nodejs.org**
2. Download the **LTS** (recommended) version
3. Run the installer and follow the steps (keep default options)
4. Restart your computer or terminal
5. Check installation:
   - Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
   - Type: `node -v` and press Enter
   - You should see a version number (e.g. `v20.10.0`)

---

### Step 2: Open Project Folder in Terminal

1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Go to your project folder:
   ```bash
   cd d:\SNPB
   ```
   (Replace `d:\SNPB` with your actual project path if different)

---

### Step 3: Install Dependencies

Run:

```bash
npm install
```

Wait until it finishes. You should see something like “added X packages” and no errors.

---

### Step 4: Create .env File for Email

1. In the project folder `d:\SNPB`, create a new file named `.env` (with the dot at the start)
2. Copy everything from `.env.example` into `.env`
3. Edit `.env` and add your Gmail details (see Step 5)

---

### Step 5: Get Gmail App Password

To send contact form emails, Gmail needs an **App Password**:

1. Open **https://myaccount.google.com/security**
2. Turn on **2-Step Verification** (if not already on)
3. Go to **App passwords**:  
   https://myaccount.google.com/apppasswords
4. Choose **Mail** and **Windows Computer** (or your device)
5. Click **Generate**
6. Copy the 16-character password (e.g. `abcd efgh ijkl mnop`)

7. Edit your `.env` file:

```
RECIPIENT_EMAIL=er.raushan.ec@gmail.com
GMAIL_USER=er.raushan.ec@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

- Replace `abcdefghijklmnop` with your real 16-character App Password (no spaces)
- If you use a different Gmail for sending, change `GMAIL_USER` to that address

---

### Step 6: Start the Server

In the same terminal:

```bash
npm start
```

You should see:

```
NPB Media server running at http://localhost:3000
```

---

### Step 7: Open the Website

1. Open a browser (Chrome, Edge, etc.)
2. Go to: **http://localhost:3000**
3. Open the **Contact** page and submit the form to test

If the form submits without errors, your local setup is working.

---

## Part 2: Make It Live (Online)

To reach the site from the internet (not only your computer), you need to host it. Here are simple options.

---

### Option A: Render (Free)

1. Create an account at **https://render.com**
2. Click **New** → **Web Service**
3. Connect your GitHub repo (or upload the project)
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment**, add:
   - `RECIPIENT_EMAIL` = `er.raushan.ec@gmail.com`
   - `GMAIL_USER` = `er.raushan.ec@gmail.com`
   - `GMAIL_APP_PASSWORD` = your App Password
6. Click **Create Web Service**
7. After deploy, your site will be at something like: `https://your-app-name.onrender.com`

---

### Option B: Railway (Free Tier)

1. Go to **https://railway.app** and sign up
2. Click **New Project** → **Deploy from GitHub** (or upload code)
3. Add your project
4. In the project, add **Variables**:
   - `RECIPIENT_EMAIL` = `er.raushan.ec@gmail.com`
   - `GMAIL_USER` = `er.raushan.ec@gmail.com`
   - `GMAIL_APP_PASSWORD` = your App Password
5. Railway will run `npm start` automatically
6. Open the generated URL (e.g. `https://your-app.up.railway.app`)

---

### Option C: Your Own VPS (VPS, Cloud Server, etc.)

If you have a VPS or cloud server (e.g. DigitalOcean, AWS, Azure):

1. Copy the project to the server
2. Install Node.js on the server
3. Create the `.env` file with your Gmail settings
4. Run:

   ```bash
   npm install
   npm start
   ```

5. Use **PM2** so the server keeps running:

   ```bash
   npm install -g pm2
   pm2 start server/server.js --name npb-media
   pm2 save
   pm2 startup
   ```

6. Configure your domain or IP in a reverse proxy (e.g. Nginx) if needed

---

## Common Problems

### “npm is not recognized”
- Node.js is not installed or not in your PATH. Reinstall Node.js and restart the terminal.

### “Cannot find module”
- Run `npm install` again in the project folder.

### Form shows “Unable to send”
- Make sure the server is running (`npm start`)
- Use **http://localhost:3000**, not `file://` (opening the HTML file directly)

### Emails not arriving
- Check that 2-Step Verification and App Password are correct
- Check spam/junk folder
- Make sure `.env` has no extra spaces and the App Password has no spaces

### Port 3000 already in use
- Edit `.env` and add: `PORT=3001` (or another free port)
- Use that port in the URL, e.g. http://localhost:3001

---

## Quick Command Summary

| Action       | Command       |
|-------------|---------------|
| Install     | `npm install` |
| Run server  | `npm start`   |
| Stop server | Press `Ctrl + C` in the terminal |

---

## What Gets Stored

- **Database:** `server/contact_submissions.db` – all contact form submissions
- **Emails:** Each submission is sent to `er.raushan.ec@gmail.com`
