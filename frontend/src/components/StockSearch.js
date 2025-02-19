import React, { useState } from "react";
import axios from "axios";

const StockSearch = () => {
    const [ticker, setTicker] = useState("");
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch stock data
    const fetchStockData = async () => {
        try {
            setError(null); // Reset error state before request
            
            // 🔹 Force Axios to always use local API
            const response = await axios.get(`http://127.0.0.1:5000/stock/${ticker}`, {
                baseURL: "http://127.0.0.1:5000",  // ✅ Explicitly set baseURL
                headers: {
                    "Cache-Control": "no-cache",  // ✅ Prevent caching old URLs
                }
            });
    
            setStockData(response.data);
        } catch (err) {
            setError("Stock not found or server error.");
            console.error("Error fetching stock data:", err);
        }
    };
    
    

    return (
        <div>
            <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Enter stock ticker (e.g., AAPL)"
            />
            <button onClick={fetchStockData}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {stockData && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Close</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(stockData).map((date) => (
                            <tr key={date}>
                                <td>{date}</td>
                                <td>{stockData[date].Open.toFixed(2)}</td>
                                <td>{stockData[date].High.toFixed(2)}</td>
                                <td>{stockData[date].Low.toFixed(2)}</td>
                                <td>{stockData[date].Close.toFixed(2)}</td>
                                <td>{stockData[date].Volume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StockSearch;
