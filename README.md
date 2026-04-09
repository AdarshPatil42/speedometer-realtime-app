# Speedometer Real-Time Application

> Real-time speed monitoring with WebSockets, PostgreSQL, and Docker

---

## Overview

A real-time speed monitoring system that simulates sensor data, stores it in a database, and displays it live on a frontend dashboard.

- Real-time updates using **WebSockets**
- Data persistence using **PostgreSQL**
- Fault tolerance using **REST API fallback**
- Containerized deployment using **Docker**

---

## Architecture

### High-Level Flow

```
[Sensor Simulator]
        ↓
[Node.js Backend + Socket.IO]
        ↓
   [PostgreSQL DB]
        ↓
[React Frontend (Vite)]
```

### Data Flow

1. Speed is generated every 1 second (simulated sensor)
2. **Backend:**
   - Stores data in PostgreSQL via Prisma
   - Emits `speed_update` event via Socket.IO
3. **Frontend:**
   - Receives real-time updates via WebSocket
   - Updates speedometer UI instantly
4. **Fallback:**
   - If socket disconnects → REST API fetches latest data from DB
   - UI updates from fallback; Socket.IO automatically reconnects

### Key Design Decisions

- Event-driven architecture for real-time updates
- Separation of concerns (services, controllers, sockets)
- Fallback REST API for reliability
- Dockerized microservices setup

---

## Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Backend   | Node.js + Express + TypeScript |
| Real-time | Socket.IO                      |
| Database  | PostgreSQL                     |
| ORM       | Prisma                         |
| Frontend  | React (Vite + TypeScript)      |
| UI        | react-gauge-component          |
| DevOps    | Docker + Docker Compose        |

---

## System Design

### High-Level Design (HLD)

- **Backend:** Data ingestion, DB persistence, WebSocket communication
- **Frontend:** Real-time rendering, fallback logic

### Low-Level Design (LLD)

**Backend modules:**

```
services/       → Business logic (speed simulation)
controllers/    → API handling
sockets/        → WebSocket management
config/         → Prisma client
```

**Frontend modules:**

```
components/     → Speedometer UI
services/       → Socket + API calls
hooks/          → Reusable logic (optional)
```

---

## Real-Time Handling

- Implemented using **Socket.IO**
- Emits `speed_update` event every second
- Frontend listens and updates UI instantly

---

## API Fallback Mechanism

**Problem:** WebSocket may disconnect unexpectedly.

**Solution:**

- Added REST endpoint: `GET /api/speed/latest`
- On disconnect: fetches latest DB value and updates UI
- Socket.IO automatically reconnects; real-time updates resume

---

## Reconnect Handling

- Socket.IO reconnects automatically
- On reconnect, real-time updates resume immediately
- Ensures continuous data flow without manual intervention

---

## Docker Setup

The system runs three containerized services:

- `backend` — Node.js + Express API
- `frontend` — React (Vite) app
- `postgres` — PostgreSQL database

**Benefits:**

- One-command startup
- Environment consistency
- Easy deployment

---

## Challenges & Solutions

### Prisma binary mismatch

**Issue:** Prisma client generated for Windows, running on Linux in Docker.  
**Fix:** Added `binaryTargets` to `schema.prisma`:

```prisma
binaryTargets = ["native", "debian-openssl-3.0.x"]
```

---

### Password encoding

**Issue:** `@` in the password broke `DATABASE_URL`.  
**Fix:** Encoded it as `%40` in the URL string; used the plain password in `docker-compose.yml`.

---

### Missing DB tables

**Issue:** Docker PostgreSQL had no schema on startup.  
**Fix:** Ran `npx prisma migrate deploy` as part of the container startup.

---

### Port conflicts

**Issue:** Local PostgreSQL was already occupying port `5432`.  
**Fix:** Remapped to `5434:5432` in `docker-compose.yml`.

---

### React library compatibility

**Issue:** `react-gauge-chart` was incompatible with React 19.  
**Fix:** Switched to `react-gauge-component`.

---

## Performance & Scalability

**Current system** handles 1 request/sec comfortably.

**Future improvements:**

- Redis + Socket.IO adapter for horizontal scaling
- Kafka for high-throughput data ingestion
- TimescaleDB for time-series optimization
- Batch inserts for improved DB write efficiency

---

## How to Run

```bash
docker-compose up --build
```

Once running:

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

---

## Key Highlights

- Real-time data streaming with fault-tolerant UI
- Clean, layered architecture
- Dockerized, one-command deployment
- Type-safe development with TypeScript + Prisma
