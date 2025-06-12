# uRex Exchange Rate Service

This project is a currency exchange rate service built with:

- **Next.js**
- **Prisma ORM**
- **PostgreSQL**
- **Docker Compose**

---

## 🧾 Features

- Uses Prisma ORM with PostgreSQL
- Seeded with sample currencies and historical rates
- Dockerized with separate services for database and web server
- Runs migrations and seeds automatically

---

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/azuanalias92/uRex.git
cd uRex
```

### 2. Environment Setup

Create a .env file in the root directory:

```
DATABASE_URL="postgresql://postgres:postgres@db:5432/urex?schema=public"
```

This matches the default settings used in docker-compose.yml.

### 3. Build and Start Services

Run the following command to build and start everything in the background:

```
docker-compose up -d --build
```

This will:

- Build the Next.js app
- Start PostgreSQL

### 4. Seed the Database (One-Time Manual Step)

Run the seed command once inside the web container:

```
docker-compose exec web npx prisma db seed
```

⚠️ Only run this once after the containers are up and migrations are applied.

### 5. Access the App

Visit:

```
http://localhost:3000
```

## 🛠 Prisma Commands (Optional)

### Generate Prisma Client

```
npx prisma generate
```

### Run Migrations (Dev)

```
npx prisma migrate dev
```

## 🐳 Docker Overview

- web: Next.js + Prisma app
- db: PostgreSQL 15
- Manual seed for better control
- Persistent volume for PostgreSQL data

## 🔧 Docker Compose Commands

```
docker-compose logs -f web
```

Stop Services

```
docker-compose down
```

Stop & Remove All (Clean Slate)

```
docker-compose down -v
```

## 📁 Project Structure

```
.
├── prisma/
│ ├── schema.prisma # Prisma schema definition
│ └── seed.ts # Seed script
├── pages/ # Next.js pages
├── Dockerfile # Web service Dockerfile
├── docker-compose.yml # Service configuration
├── .env # Database URL
├── package.json
└── README.md
```
