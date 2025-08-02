################################
# Build assets
################################
FROM node:24.4.1-alpine as builder

WORKDIR /app

COPY /app .
RUN npm ci -D
RUN npm run build


################################
# Create server
################################
FROM python:3.8-slim-buster

WORKDIR /app

COPY server/requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY server/src src


COPY --from=builder /app/dist /app/dist

CMD ["uvicorn", "src.main:app", "--host", "::", "--port", "80"]

EXPOSE 80
