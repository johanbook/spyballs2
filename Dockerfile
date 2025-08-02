FROM python:3.8-slim-buster

WORKDIR /app

COPY server/requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY server/* .

CMD ["uvicorn", "src.main:app", "--reload", "--host", "::", "--port", "80"]

EXPOSE 80
