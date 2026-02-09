# Contact Form Setup - Database + Email

The contact form saves submissions to a SQLite database and sends an email with all collected data.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email

Copy `.env.example` to `.env` and add your email settings:

```bash
copy .env.example .env
```

**For Gmail:**
1. Enable [2-Step Verification](https://myaccount.google.com/security)
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. In `.env`:
   ```
   RECIPIENT_EMAIL=er.raushan.ec@gmail.com
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   ```

**For other SMTP (Outlook, Yahoo, etc.):**
```
RECIPIENT_EMAIL=er.raushan.ec@gmail.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

### 3. Run the Server

```bash
npm start
```

### 4. Open the Site

Visit **http://localhost:3000** and go to the Contact page. Submit the form.

## What Happens

- **Database**: All submissions are stored in `server/contact_submissions.db` (SQLite)
- **Email**: A formatted email with Name, Email, Subject, and Message is sent to `RECIPIENT_EMAIL`

## Database Location

- File: `server/contact_submissions.db`
- Table: `submissions` (id, name, email, subject, message, created_at)

## Production Deployment

When deploying to a hosting service (Heroku, Railway, Render, etc.):

1. Set environment variables (GMAIL_* or SMTP_*, RECIPIENT_EMAIL)
2. Ensure the Node server runs and serves the static files
3. Use the same origin for frontend and API, or set `window.API_BASE_URL = 'https://your-api-domain.com'` before loading script.js
