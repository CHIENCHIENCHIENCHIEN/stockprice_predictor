from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/stock/<ticker>', methods=['GET'])
def get_stock(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1y")
    return jsonify(data.to_dict())

if __name__ == '__main__':
    app.run(debug=True)
