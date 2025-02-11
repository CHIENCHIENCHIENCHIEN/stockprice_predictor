import React, { useState } from "react";
import axios from "axios";

const StockSearch = () => {
    const [ticker, setTicker] = useState("");
    const [stockData, setStockData] = useState(null);

    const fetchStockData = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/stock/${ticker}`);
        setStockData(response.data);
    };

    return (
        <div>
            <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="Enter stock ticker" />
            <button onClick={fetchStockData}>Search</button>
            {stockData && <pre>{JSON.stringify(stockData, null, 2)}</pre>}
        </div>
    );
};

export default StockSearch;
