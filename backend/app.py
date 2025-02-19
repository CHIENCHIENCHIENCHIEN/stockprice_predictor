from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app, resources={r"/stock/*": {"origins": "*"}})

# ✅ Simple in-memory cache to store stock data and avoid excessive API calls
stock_cache = {}
cache_time = 60  # Cache results for 60 seconds

@app.route('/stock/<ticker>', methods=['GET'])
def get_stock(ticker):
    try:
        current_time = time.time()

        # ✅ If stock data is cached and not expired, return cached data
        if ticker in stock_cache and (current_time - stock_cache[ticker]["timestamp"] < cache_time):
            return jsonify(stock_cache[ticker]["data"])

        stock = yf.Ticker(ticker)
        data = stock.history(period="1y")

        if data.empty:
            return jsonify({"error": f"Stock ticker '{ticker}' not found"}), 404
        
        data.index = data.index.strftime('%Y-%m-%d')  # Convert timestamps to strings
        stock_cache[ticker] = {
            "data": data.to_dict(orient="index"),
            "timestamp": current_time  # Save timestamp for cache expiration
        }
        return jsonify(stock_cache[ticker]["data"])

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


