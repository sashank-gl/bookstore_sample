# 📚 Bookstore App

A simple full-stack Bookstore application built with **React**, **Node.js**, and **MongoDB**, styled with **Tailwind CSS**, and integrated with **Stripe** for payments.

---

## 📂 Project Structure

```
.
├── ui                # Frontend (React)
├── api               # Backend (Node.js with Express)
├── .gitignore        # Files to ignore in version control
├── README.md         # Project documentation
```

---

## ⚙️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **CSS Framework:** Tailwind CSS
- **Payment Integration:** Stripe

---

## 🚀 How to Run the Project

### 1⃣ Clone the Repository

```bash
git clone https://github.com/sashank-gl/bookstore_sample.git
cd bookstore_sample
```

### 2⃣ Install Backend

```bash
cd api
npm install
```

Create a `.env` file in the `/api` folder:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

### 3⃣ Install Frontend

```bash
cd ../ui
npm install
```

Start the frontend server:

```bash
npm run dev
```

---

### 4⃣ Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 🗃️ Key Features

✅ Browse and add books to the cart  
✅ See the number of items in the cart  
✅ Custom toast notification for added items  
✅ Secure checkout via Stripe

---

## 🐞 Common Issues

1. **MongoDB connection error** — Check your `.env` file for the correct database URL.
2. **Stripe payment issue** — Ensure your Stripe keys are valid and in test mode.
3. **CORS error** — Confirm your frontend’s base URL matches the allowed origin in `app.js`.

---

## 📄 Important Notes

- For testing Stripe payments, use the test card: **4242 4242 4242 4242**
- Ensure MongoDB is running when starting the backend.

---

## 🙌 Contact

If you have questions or run into issues, feel free to ask! 😊
