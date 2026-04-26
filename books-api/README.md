# Books API

A RESTful API for managing a book collection, built with Node.js and Express.
Fully containerized with Docker and shipped via an automated CI/CD pipeline using GitHub Actions.

## Endpoints

| Method | Route        | Description         |
|--------|--------------|---------------------|
| GET    | /health      | Health check        |
| GET    | /books       | List all books      |
| GET    | /books/:id   | Get book by ID      |
| POST   | /books       | Create a book       |
| PUT    | /books/:id   | Update a book       |
| DELETE | /books/:id   | Delete a book       |

## Run locally

```bash
npm install
npm run dev
```

## Run with Docker

```bash
docker build -t books-api .
docker run -p 3000:3000 books-api
```

## CI/CD Pipeline

Every push to `main`:
1. ESLint checks code quality
2. Jest runs all tests with coverage
3. Docker image is built and pushed to Docker Hub (tagged `latest` + commit SHA)
