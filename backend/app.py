from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/stock/<ticker>', methods=['GET'])
def get_stock(ticker):
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1y")  # Fetch 1 year of data
        
        if data.empty:
            return jsonify({"error": "Stock ticker not found"}), 404
        
        # Convert index (timestamps) to strings
        data.index = data.index.strftime('%Y-%m-%d')

        # Convert DataFrame to JSON format
        return jsonify(data.to_dict(orient="index"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
