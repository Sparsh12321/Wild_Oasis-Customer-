# 🏝️ Wild Oasis – Customer Facing Website

A sleek and responsive booking interface for **The Wild Oasis**, where guests can explore cabins, choose dates, and make reservations with ease. Built with modern web technologies, the site is designed to offer a seamless user experience.

🚀 **Live Demo:** [wild-oasis-demo-one.vercel.app](https://wild-oasis-demo-one.vercel.app)

---

## 📸 Screenshots

### Home Page
![image](https://github.com/user-attachments/assets/e49a637f-6e44-442a-ab3f-99c310eb3caa)
)

### Cabin List
![image](https://github.com/user-attachments/assets/e2b9c3e3-36fb-4235-9f15-f880c3571fa0)
)

### Reservation Form
![image](https://github.com/user-attachments/assets/87febd06-1461-437e-9457-a1dc12bcd076)
)
### Profile Page
![image](https://github.com/user-attachments/assets/bbf32369-64de-48f6-bce8-4078dad21d79)

---

## 🧾 Features

- ✅ Fully responsive customer-facing booking system
- 🏕️ Displays cabin listings with filtering options
- 📅 Intuitive date range selection for reservations
- 📃 Summary UI for reservations including pricing and guest count
- 🔒 Authentication via NextAuth (Google Sign-in)
- 🌐 Deployed on Vercel for fast performance and scalability

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router)
- **UI Framework:** Tailwind CSS
- **Authentication:** NextAuth (Google Provider)
- **Form Handling:** Native HTML FormData + React Context
- **State Management:** Context API
- **API & Backend:** Connected to a separate backend API (not in this repo)
- **Deployment:** Vercel

---


## ⚙️ Getting Started

### 1. Clone the Repo & Install Dependencies

```bash
git clone https://github.com/Sparsh12321/Wild_Oasis-Customer.git
cd Wild_Oasis-Customer
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file in the root with the following keys:

```env
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=some_random_secret
API_URL=https://your-api-url.com
```

### 3. Run the App Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🧩 Folder Structure

```vbnet
📦 Wild_Oasis-Customer
 ┣ 📂 app
 ┃ ┣ 📂 _components      → Shared UI components
 ┃ ┣ 📂 cabins           → Cabin listing and details
 ┃ ┣ 📂 reserve          → Reservation form & logic
 ┃ ┣ layout.jsx          → Root layout
 ┃ ┣ page.jsx            → Main homepage
 ┣ 📂 public             → Static assets (e.g., screenshots)
 ┣ 📜 tailwind.config.js
 ┣ 📜 next.config.js
 ┣ 📜 README.md
```

---



## 🙌 Acknowledgements

- Inspired by the "Wild Oasis" project idea from Jonas Schmedtmann’s course  

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**Sparsh Jain**  
🔗 [LinkedIn]([https://www.linkedin.com/in/sparshjain21](https://www.linkedin.com/in/sparsh2308/))  
📬 jainsparsh231@gmail.com

