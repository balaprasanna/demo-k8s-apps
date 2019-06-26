import os
from flask import Flask, render_template, request, Response
from flask_cors import CORS
import pandas as pd
import requests
import json

app = Flask(__name__, static_url_path='', static_folder='frontend')
CORS(app)

# ENV Variables
PORT = int(os.getenv("PORT", 5000))
APIKEY = os.getenv("APIKEY")

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/health")
def health():
    return Response("i am healthy", status=200)

@app.route("/symbols")
def symbols():
    resp = get_all_symbols()
    return SendResponse(resp)

@app.route("/price")
def getprice():
    from_ = request.args.get("from", "USD")
    to_ = request.args.get("to", "SGD")
    resp = get_price(from_ , to_)
    return SendResponse(resp)

@app.route("/history")
def gethistory():
    fsym = request.args.get("fsym", "USD")
    tsym = request.args.get("tsym", "SGD")
    limit = request.args.get("limit", "30")
    resp = get_history(**request.args)
    return SendResponse(resp)

######### UTIS Begins ############

url_tpl = "https://min-api.cryptocompare.com/data/price?fsym={}&tsyms={}"
mapping_url = f"https://min-api.cryptocompare.com/data/pair/mapping/fsym?fsym=BTC&api_key={APIKEY}"
# histoday_ref = "https://min-api.cryptocompare.com/data/histoday?fsym={}&tsym={}&limit={}"
histoday_url = "https://min-api.cryptocompare.com/data/histoday?"

def get_all_symbols():
    resp = requests.get(mapping_url).json()
    symbols = list(pd.DataFrame(resp['Data']).tsym.unique()) + ["BTC"]
    return symbols
    
def get_price(from_="BTC" , to_="USD"):
    url = url_tpl.format(from_ , to_ )
    return requests.get(url).json()

def get_history(**kwgs):
    q_string = dict_to_querystring(kwgs)
    url = histoday_url + q_string
    print(url)
    return requests.get(url).json()

def dict_to_querystring(kwgs):
    q_string = ""
    for k,v in kwgs.items():
        q_string = q_string + f"{k}={v}&"
    q_string = q_string[:-1] #remove the last &    
    return q_string

def SendResponse(resp, status=200, content_type="application/json"):
    resp = json.dumps( resp )
    return Response(resp, content_type=content_type, status=status)

######### UTIS Ends ############

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)