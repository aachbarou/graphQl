# Zone01 Dashboard Client

A lightweight, responsive frontend dashboard for interacting with the [zone01oujda.ma](https://learn.zone01oujda.ma) API. This project includes login authentication, dynamic SVG visualization, and user XP tracking—all styled with custom CSS and animated UI elements.

**Live Demo:** [https://graphql-a.netlify.app/](https://graphql-a.netlify.app/)

## 🚀 Features

- 🔐 Login using Basic Auth (email/password)
- 📊 Real-time XP, progression, and user data
- 🧠 Clean SVG-based visualizations (Polygons, Circles)
- 💬 Interactive UI with animated sections and transitions
- 📱 Fully responsive and mobile-friendly design

## 🧰 Tech Stack

- **Frontend:** HTML, CSS (custom), JavaScript (ES6)
- **Auth API:** [learn.zone01oujda.ma](https://learn.zone01oujda.ma)

> You can easily deploy this project on [Netlify](https://www.netlify.com/) by connecting your repository and selecting the `static` folder as the publish directory—no backend setup required.

## 🔑 Authentication Flow

1. User enters email and password.
2. Credentials are encoded and sent as `Authorization: Basic <base64>`.
3. API returns JWT token on success.
4. Token is saved in `localStorage`.
5. User ID is fetched and stored.
6. Dashboard is initialized with data from authenticated routes.

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/aachbarou/graphQl/tree/ACHBAROU

