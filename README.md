# Second Chance Marketplace

A complete Node.js and Express backend capstone project for an online marketplace that gives reusable items a second chance.

## Features

- MongoDB connection using `await client.connect()`
- 16-document seed dataset
- Item list, detail, create, update, and delete APIs
- Image upload using Multer
- Search by category, condition, age, and keywords
- Secure registration, bcrypt password hashing, JWT login, and profile update
- Sentiment analysis using the `natural` package
- Responsive landing page with a **Get Started** button
- Docker and Kubernetes deployment configuration
- GitHub Actions CI workflow with lint, tests, and Docker build

## Quick start

```bash
cp .env.example .env
npm install
npm run seed
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/secondchance/items` | List all items |
| GET | `/api/secondchance/items/:id` | Get one item |
| POST | `/api/secondchance/items` | Create an item with file upload (JWT required) |
| PUT | `/api/secondchance/items/:id` | Update an owned item |
| DELETE | `/api/secondchance/items/:id` | Delete an owned item |
| GET | `/api/secondchance/search` | Search/filter items |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Log in |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/sentiment` | Analyze text sentiment |

## Assignment links

- [Task 1 — user-story.md](user-story.md)
- [Task 2 — GitHub issues](../../issues)
- [Task 3 — seed data and script](scripts/seed.js)
- [Task 4 — db.js](db.js)
- [Task 5 — secondChanceItemsRoutes.js](routes/secondChanceItemsRoutes.js)
- [Task 6 — searchRoutes.js](routes/searchRoutes.js)
- [Task 7 — app.js](app.js)
- [Task 8 — index.js with natural](index.js)
- [Dockerfile](Dockerfile)
- [MongoDB Kubernetes manifest](deploymongo.yml)
- [Application Kubernetes manifest](deployment.yml)
- [CI/CD workflow](.github/workflows/ci.yml)
- [Evidence generation instructions](evidence/README.md)

## Important submission note

Tasks 10–16 require evidence from **your actual deployed environment**: a browser screenshot with the deployment URL, real cURL responses, and a successful GitHub Actions run. The repository includes exact instructions for generating those files, but it does not fabricate deployment evidence.

## Security

Copy `.env.example` to `.env` and replace `JWT_SECRET`. Never commit real credentials. For production, replace the example Kubernetes storage and secret configuration with managed persistent storage and a secure secrets service.
