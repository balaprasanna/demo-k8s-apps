import os
from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", 5000))

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/train")
def train():
    return "Traning ..."

@app.route("/predict")
def predict():
    return "Predict ..."

# Util functions

def load_data(url, **kwargs):
    df = pd.read_csv(url, **kwargs)
    return df

app.run(host='0.0.0.0', port=PORT)