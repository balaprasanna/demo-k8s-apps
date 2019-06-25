FROM python:3

ENV PORT=5000 APP_DIR=app APIKEY='50e5dc615514f767e6570da2787f5a57462bce321dac874e8bd5cd06a1fc66c2'

WORKDIR ${APP_DIR}

ADD requirements.txt .

RUN pip install -r requirements.txt

ADD . .

HEALTHCHECK --interval=15s --timeout=10s \
	CMD curl -f http://localhost:${PORT}/health || exit 1

EXPOSE ${PORT}

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000"]