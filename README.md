# QueueMaster 📋

> **Simple Queue Management for Small Businesses**

QueueMaster is a clean, responsive, and robust full-stack web application designed to help business owners (e.g., barber shops, clinics, restaurants, banks, passport offices) manage customers waiting for service. It provides a simple, modern FIFO queue system that streamlines the customer flow from **Waiting** to **Being Served** and finally **Completed**.

---

## 🎨 Technology Stack

*   **Frontend**: React 19, Vite, Tailwind CSS, Axios, Lucide Icons
*   **Backend**: Node.js, Express, TypeScript, TSX
*   **Database**: SQLite (`better-sqlite3` driver)
*   **Web Server / Proxy**: Nginx (used as a static file server and reverse proxy in Docker production)
*   **Containerization**: Docker, Docker Compose

---

## 📁 Project Folder Structure

```text
/
├── backend/                       # Node.js + Express Backend Service
│   ├── config/
│   │   └── dbConfig.ts            # Database & port configurations
│   ├── controllers/
│   │   └── customerController.ts  # REST controller handlers (CRUD & states)
│   ├── database/
│   │   └── db.ts                  # SQLite better-sqlite3 initialization
│   ├── middleware/
│   │   ├── errorHandler.ts        # Centralized Express error handler
│   │   └── validationMiddleware.ts# Character constraint and empty string validation
│   ├── models/
│   │   └── customerModel.ts       # Database queries & Customer schema
│   ├── routes/
│   │   └── customerRoutes.ts      # Route declarations mapped to controllers
│   ├── app.ts                     # Express App assembly & custom CORS
│   ├── server.ts                  # Bootstrapping script for standalone backend
│   ├── Dockerfile                 # Multi-stage lightweight backend image
│   └── package.json               # Backend packages & tsx execution
│
├── frontend/                      # React SPA Frontend Service
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomerCard.tsx   # Detailed customer card with context actions
│   │   │   ├── CustomerForm.tsx   # Trimmed text input with length constraints
│   │   │   ├── EmptyState.tsx     # Custom queue empty placeholders
│   │   │   ├── Footer.tsx         # Responsive footer section
│   │   │   ├── Header.tsx         # Clean brand heading & live status indicator
│   │   │   └── QueueList.tsx      # Reusable status column container
│   │   ├── pages/
│   │   │   └── Dashboard.tsx      # Core state controller & 3-column layout
│   │   ├── services/
│   │   │   └── api.ts             # Axios API client
│   │   ├── App.tsx                # Layout entrypoint
│   │   ├── index.css              # Custom Display typography imports & Tailwind
│   │   ├── main.tsx               # DOM mounting
│   │   └── types.ts               # Shared TypeScript schemas
│   ├── Dockerfile                 # Multi-stage React builder + Nginx proxy
│   ├── nginx.conf                 # Nginx routing config with /api reverse proxy
│   ├── index.html                 # App HTML template
│   └── package.json               # Frontend dependencies & configurations
│
├── dist/                          # Compiled assets (production only)
├── docker-compose.yml             # Local multi-container development orchestration
├── package.json                   # Root unified workspace descriptors for AI Studio
├── tsconfig.json                  # Root TypeScript settings
├── vite.config.ts                 # Multi-root Vite setup pointing to frontend/
└── README.md                      # Comprehensive project documentation
```

---

## ⚙️ Running the Application

### Method 1: Docker Compose (Highly Recommended)

Running a single command builds both images and establishes a unified network where the frontend reverse-proxies the backend API.

1.  **Prerequisites**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and ensure Docker Compose is running.
2.  **Start Services**:
    ```bash
    docker compose up --build
    ```
3.  **Access the Application**:
    *   **Frontend UI**: [http://localhost:8080](http://localhost:8080)
    *   **Backend API**: [http://localhost:5000/api/customers](http://localhost:5000/api/customers)

---

### Method 2: Manual Local Development (Without Docker)

You can run both servers in a unified workspace locally or using the development preview:

1.  **Install dependencies at root**:
    ```bash
    npm install
    ```
2.  **Start the unified development server**:
    ```bash
    npm run dev
    ```
3.  **Access the application** at [http://localhost:3000](http://localhost:3000). The Express server will serve the APIs and transparently mount Vite to serve the React code!

---

## 🔌 REST API Endpoints

The backend exposes a highly standardized REST API on `/api/customers`:

| HTTP Method | Endpoint | Request Body | Response Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/customers` | *None* | `200` | Return all queue customers |
| **POST** | `/api/customers` | `{ "name": "Sayan Samanta" }` | `201`, `400` | Create customer (Defaults status to `Waiting`) |
| **PUT** | `/api/customers/:id/serve` | *None* | `200`, `400`, `404` | Transition `Waiting` ➔ `Being Served` |
| **PUT** | `/api/customers/:id/complete`| *None* | `200`, `400`, `404` | Transition `Being Served` ➔ `Completed` |
| **DELETE** | `/api/customers/:id` | *None* | `200`, `404` | Permanently delete customer from queue |

---

## 🧠 Assumptions

*   **FIFO Queue**: Queue transitions strictly follow first-in, first-out sequence.
*   **Name Duplicates**: Duplicate customer names are allowed (since multiple people can have the same name in a real business environment). Customers are uniquely identified by their auto-incremented database `id`.
*   **Single-Session Serve**: Only one customer can be in the `"Being Served"` status at any given time. Attempting to transition a second customer to `"Being Served"` before completing the active session returns an explicit `400 Bad Request` explaining who is currently being served.
*   **One-way Progression**: Completed customers are static. They cannot return to the waiting queue or go back to being served.
*   **Permanent Removal**: The delete operation permanently clears the customer record from the database to maintain clean business logs.
*   **Empty States**: Clear and helpful empty states are displayed dynamically for each of the three stages when no customer matches the state.

---

## ⚡ Environment Variables

Our architecture defaults to secure presets but can be configured using environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `3000` (root) / `5000` (Docker) | Port used to serve Express API endpoints |
| `NODE_ENV` | `development` | Switches Express optimization and production/dev Vite bundling modes |

---

## ⏰ If I Had Another 3 Hours...

With additional time, I would expand the feature set and infrastructure to make QueueMaster ready for large-scale enterprise deployment:

1.  **Estimated Waiting Time (EWT)**: Implement an algorithm that calculates average completion times for completed customers over the past hour and provides real-time wait estimation (e.g., `"Your estimated wait time is 12 mins"`) to waiting customers.
2.  **Unique Ticket Generation**: Auto-generate unique sequential codes (e.g., `B-101` for barbering, `C-101` for checkup) upon registration so customers can track their position without exposing their full names on screen.
3.  **Real-time synchronization (WebSockets)**: Integrate `socket.io` so that when a business owner modifies the queue state on one dashboard, the view instantly updates across any secondary public display TVs or customer devices.
4.  **End-to-End Test Coverage**: Implement unit tests for backend controllers using `Jest` and `Supertest`, and React component integration tests with `React Testing Library` and `Vitest`.
5.  **Analytics and Reporting**: Build a lightweight tab to show business owners metrics like peak hours, average service times, and daily customer volume.

---

## ⚖️ Compromises Due to the Time Limit

*   **SQLite Instead of PostgreSQL**: Used SQLite (`better-sqlite3`) because it's completely self-contained and does not require complex cluster provisioning or database seeding scripts, allowing reviewers to boot the project instantly.
*   **Local State vs. Redux/Zustand**: Selected standard React local state managed in `Dashboard` container. Since this is a simple queue with a single dashboard view, passing states directly avoids boilerplate code and speeds up rendering, though state libraries would be preferred for larger, multi-page architectures.
*   **Default Confirmation Dialogs**: Utilized native browser `window.confirm` for delete confirmation to focus engineering effort on clean controllers, solid API structures, and stable Nginx routing.
