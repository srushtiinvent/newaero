# AeroPath Alert Service

A Spring Boot microservice, separate from the Node.js/Express core backend, responsible for one thing: **disruption-alert logic** — flagging itinerary items affected by flight delays, cancellations, or gate changes.

## Why a separate service?

AeroPath's core (auth, trips, profile) is a Node/Express/Prisma app. Rather than bolt alert logic onto it, this lives as its own Spring Boot service with its own database table (`alerts`), talking to the *same* PostgreSQL instance via Spring Data JPA. This is a genuine polyglot microservices setup, not a rewrite of the existing backend.

## Stack

- Java 17, Spring Boot 3.3, Spring Data JPA, Spring Web, Bean Validation
- PostgreSQL (shared with the Node backend)
- Docker (multi-stage build)

## Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/alerts` | Create an alert |
| GET | `/api/alerts/{userId}?unresolvedOnly=true` | List a user's alerts |
| PATCH | `/api/alerts/{id}/resolve` | Mark an alert resolved |

## Running locally

```bash
# set DB_URL / DB_USER / DB_PASSWORD to match your existing Postgres instance
cd java-service
mvn spring-boot:run
```

## Running with Docker

```bash
docker build -t aeropath-alert-service .
docker run -p 8081:8081 \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/aeropath \
  -e DB_USER=postgres \
  -e DB_PASSWORD=postgres \
  aeropath-alert-service
```

## Deploying to GCP Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/aeropath-alert-service
gcloud run deploy aeropath-alert-service \
  --image gcr.io/PROJECT_ID/aeropath-alert-service \
  --set-env-vars DB_URL=...,DB_USER=...,DB_PASSWORD=... \
  --region asia-south1
```

## Status

Scaffolded and internally consistent (entity, repository, service, controller, tests, Dockerfile all written and cross-checked). Not yet built or run against a live database in this environment — run `mvn clean install` locally before relying on it, since Maven Central isn't reachable from the sandbox this was written in.
