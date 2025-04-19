# Suggestion and Complaint Management System

A web-based platform designed to manage student complaints and suggestions within an academic institution

### Student Side:

- Submit suggestions or complaints with full details
- Attach an optional image or file
- Specify the type (complaint/suggestion), title, and urgency
- Receive an email notification upon supervisor response
- View the current status of their request

---

### Supervisor Side:

- Login/logout securely
- View list of all requests (open/closed)
- Filter and search requests
- View request details, image, and student info
- Respond to the request with a message
- Send reply to student via email
- Update status to “closed” after reply
- Create new supervisor accounts
- Update the info for aother supervisores

---

### Install Dependencies

```bash
npm i express nodemon ejs express-session express-validator mysql2 sequelize nodemailer multer
```

---

### Start the App

```bash
npm start
```

---

### Run Supervisor seeder

```bash
npm run seed
```

---

### 🌐 Startup Routes

- **Student Route**: `/cms/requests/create`
- **Supervisor Route**: `/cms/login`

---

### 1. Clone the Repository

```bash
git clone https://github.com/isaackq/Suggestion-and-Complaint.git
cd Suggestion-and-Complaint
```
