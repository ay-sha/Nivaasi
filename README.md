# 🏡 Nivaasi

**Nivaasi** is a fully functional web application that allows users to discover and list unique stays around the world. Users can sign up, create and manage their listings, add reviews, explore properties using filters and search options, and enjoy a rich, responsive UI experience. The project is built using the **MVC architecture**, and includes **Joi server-side validation** for secure data handling.

---

## 📝 Project Overview

Nivaasi offers a seamless accommodation rental experience with full-stack features:

- 🔐 **Authentication & Authorization** with Passport.js
- 🏠 **Listings**: Users can create, edit, and delete their own property listings
- 💬 **Reviews**: Add, and delete reviews on listings
- 🔍 **Search & Filters**: Search by country or location and filter by category
- 📤 **Image Upload** via Cloudinary
- 🧪 **Server-side schema validation** using Joi
- 🎯 **Responsive UI** using HTML, CSS, JavaScript, EJS, and Swiper.js
- 📦 **Cloud Deployment** using Render.com and MongoDB Atlas

---

## 🧱 MVC Architecture

Nivaasi follows the **Model-View-Controller (MVC)** pattern:

- **Models**: Mongoose schemas for Listings, Users, and Reviews
- **Views**: Dynamic EJS templates rendered on the server
- **Controllers**: Modular route logic for better separation of concerns

---

## ✨ Key Features

- User registration and login using **Passport.js**
- Full **CRUD functionality** for listings and reviews
- Role-based **authorization** for editing/deleting content
- **Cloud image upload** with Cloudinary
- **Search and category filtering** (e.g., Boats, Countryside, Iconic Cities)
- **Swiper.js**-based image sliders for better UX
- **Joi validation** for secure and consistent server-side input validation
- Deployed on **Render.com**, database on **MongoDB Atlas**

---

| Category            | Tools / Technologies                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| **Frontend**        | HTML, CSS, JavaScript, EJS, Bootstrap, Swiper.js                                |
| **Backend**         | Node.js, Express.js                                                             |
| **Templating**      | EJS (Embedded JavaScript templates)                                             |
| **Database**        | MongoDB Atlas, Mongoose                                                         |
| **Authentication**  | Passport.js (Local Strategy)                                                    |
| **Authorization**   | Passport.js (Local Strategy)                                                    |
| **Validation**      | Joi (Server-side schema validation), Bootstrap(Client Side Validation)          |
| **Cloud Services**  | Cloudinary (image uploads), Render.com (deployment)                             |
| **Architecture**    | MVC (Model-View-Controller)                                                     |
| **Other Libraries** | Multer (file handling), Method-Override, Connect-Flash, Express-Session, Dotenv |


---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nivaasi.git
   cd nivaasi
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```
   DATABASE_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SECRET=your_session_secret
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

---

## 📁 Folder Structure

```
nivaasi/
├── public/                 # Static assets (CSS, JS, images)
│
├── views/                 # EJS templates (View)
│   ├── listings/          # Templates for listings
│   ├── reviews/           # Templates for reviews
│   ├── users/             # Templates for login/register
│   └── partials/          # Reusable components like header/footer
│
├── routes/                # Express routes
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── controllers/           # Route logic (Controller)
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
│
├── models/                # Mongoose models (Model)
│   ├── Listing.js
│   ├── Review.js
│   └── User.js
│
├── middleware/            # Custom middleware
│   ├── isLoggedIn.js
│   ├── validateListing.js # Joi validation for listings
│   └── validateReview.js  # Joi validation for reviews
│
├── config/                # Configuration files
│   └── db.js              # MongoDB connection setup
│
├── init/                  # Initialization (e.g., Passport config)
│   └── passportConfig.js
│
├── cloudinary/            # Cloudinary setup
│   └── index.js
│
├── schemas/               # Joi schemas for validation
│   ├── listingSchema.js
│   └── reviewSchema.js
│
├── .env                   # Environment variables
├── app.js                 # Main Express app entry point
├── package.json
└── README.md
```

---

## 📸 Screenshots
Home Page
<img width="1421" alt="image" src="https://github.com/user-attachments/assets/8e1cd4c3-9dfa-407b-8e49-afa1f8d5e4d2" />
Create Listing Page
<img width="1422" alt="image" src="https://github.com/user-attachments/assets/708746c8-4bd7-4faa-8a35-def5192be5f7" />
Listing Details
<img width="1416" alt="image" src="https://github.com/user-attachments/assets/d4f104d8-7f33-4b48-a782-9b968e719951" />


---

## 👤 Author

**Aysha Akter Sumi**
---

