# Spyballs

**Spyballs** is an awesome app created by Edvin Jakobsson and Johan Book.

## Development

Spyballs consists of a backend and a frontend that are run as separate
micro-services.

### Backend

The backend dev server is started from `./backend` by running

```sh
uvicorn src.main:app --reload
```

### Frontend

The frontend dev server is started from `./frontend` by running

```sh
npm start
```

## Deployment

Create a `.env` file containing

```sh
export DOMAIN=<REPLACE-ME> # NB: Set to `localhost` in dev
export EMAIL=<REPLACE-ME>
```

### Development

To use a development build, run

```sh
docker-compose -f docker-compose.dev.yaml up --build
```

### Production

To use a production build, run

```sh
docker-compose -f docker-compose.prod.yaml up
```
