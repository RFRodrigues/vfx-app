import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import testData from "./test.json";

const Home = () => {
  const [currencyFrom, setCurrencyFrom] = useState("GBP");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [lastUpdated, setLastUpdated] = useState("");
  const [forexData, setForexData] = useState({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const API_KEY = "yourAPIKeyHere"; // Replace with your actual API key
  const isFirstRender = useRef(true);

  const fetchForexData = async () => {
    if (currencyFrom === currencyTo) {
      alert("Please select different currencies.");
      return;
    }

    let data;
    if (process.env.NODE_ENV === "development") {
      console.log("Using test data");
      data = testData;
    } else {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${currencyFrom}&to_symbol=${currencyTo}&apikey=${API_KEY}`
        );
        data = await response.json();
      } catch (error) {
        console.error("Error fetching Forex data:", error);
        return;
      }
    }

    if (data["Time Series FX (Daily)"]) {
      const latestDate = Object.keys(data["Time Series FX (Daily)"])[0];
      const latestData = data["Time Series FX (Daily)"][latestDate];

      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${latestDate} ${hours}:${minutes}`;

      setForexData({
        open: parseFloat(latestData["1. open"]).toFixed(5),
        high: parseFloat(latestData["2. high"]).toFixed(5),
        low: parseFloat(latestData["3. low"]).toFixed(5),
        close: parseFloat(latestData["4. close"]).toFixed(5),
      });

      setLastUpdated(formattedTime);
    } else {
      console.error("Invalid data format:", data);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchForexData();
  }, [currencyFrom, currencyTo]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-900 p-4 flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
          <img src="/logo-white.svg" alt="VFX Financial" className="h-10" />

          {/* Burger Menu Button */}
          <button
            className="text-white text-2xl sm:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Dropdown Menu (Mobile) */}
      {menuOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-lg rounded">
          <button
            className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded w-full text-left cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        {/* Title, Last Refresh & Currency Selection */}
        <div className="flex flex-wrap flex-col sm:flex-row sm:flex-nowrap items-start sm:items-center gap-6">
          {/* Title & Last Refresh */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Forex Daily Prices</h2>
            <span className="text-sm text-gray-500">Last refresh: {lastUpdated}</span>
          </div>

          {/* Dropdowns - Stack on Mobile */}
          <div className="flex flex-row items-start sm:items-center gap-4 w-auto">
            <select
              className="p-2 border rounded w-full sm:w-auto"
              value={currencyFrom}
              onChange={(e) => setCurrencyFrom(e.target.value)}
            >
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <select
              className="p-2 border rounded w-full sm:w-auto"
              value={currencyTo}
              onChange={(e) => setCurrencyTo(e.target.value)}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchForexData}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center justify-center min-w-[40px] cursor-pointer"
            >
              <img src="/update.svg" alt="Refresh" className="w-6 h-6 aspect-square" />
            </button>
          </div>
        </div>

        {/* Forex Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="text-gray-500">
              <tr className="border-b border-gray-300">
                <th className="p-3 border-r border-gray-300">Open</th>
                <th className="p-3 border-r border-gray-300">High</th>
                <th className="p-3 border-r border-gray-300">Low</th>
                <th className="p-3">Close</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="p-3  text-gray-600 border-r border-gray-300">{forexData.open}</td>
                <td className="p-3 bg-gray-100 text-gray-700 font-semibold border-r border-gray-300">{forexData.high}</td>
                <td className="p-3 bg-gray-100 text-gray-700 font-semibold border-r border-gray-300">{forexData.low}</td>
                <td className="p-3 text-gray-600">{forexData.close}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
