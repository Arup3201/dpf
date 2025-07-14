"use client";
import React, { useState, useMemo, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Target,
  BarChart3,
  Building2,
} from "lucide-react";
import { api } from "@/utils/api";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: "NSE" | "BSE";
  currentPrice: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  peRatio: number;
  latestEarnings: number;
}

const mockData: Stock[] = [
  {
    id: "1",
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    purchasePrice: 2500,
    quantity: 10,
    investment: 25000,
    portfolioPercentage: 35.2,
    exchange: "NSE",
    currentPrice: 2650,
    presentValue: 26500,
    gainLoss: 1500,
    gainLossPercent: 6.0,
    peRatio: 15.2,
    latestEarnings: 174.5,
  },
  {
    id: "2",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    purchasePrice: 3200,
    quantity: 5,
    investment: 16000,
    portfolioPercentage: 23.5,
    exchange: "NSE",
    currentPrice: 3350,
    presentValue: 16750,
    gainLoss: 750,
    gainLossPercent: 4.69,
    peRatio: 28.5,
    latestEarnings: 117.8,
  },
  {
    id: "3",
    symbol: "INFY",
    name: "Infosys Limited",
    purchasePrice: 1450,
    quantity: 15,
    investment: 21750,
    portfolioPercentage: 29.8,
    exchange: "NSE",
    currentPrice: 1420,
    presentValue: 21300,
    gainLoss: -450,
    gainLossPercent: -2.07,
    peRatio: 24.3,
    latestEarnings: 58.4,
  },
  {
    id: "4",
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    purchasePrice: 1580,
    quantity: 8,
    investment: 12640,
    portfolioPercentage: 17.1,
    exchange: "NSE",
    currentPrice: 1620,
    presentValue: 12960,
    gainLoss: 320,
    gainLossPercent: 2.53,
    peRatio: 18.7,
    latestEarnings: 86.9,
  },
  {
    id: "5",
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    purchasePrice: 950,
    quantity: 12,
    investment: 11400,
    portfolioPercentage: 15.4,
    exchange: "NSE",
    currentPrice: 1025,
    presentValue: 12300,
    gainLoss: 900,
    gainLossPercent: 7.89,
    peRatio: 16.2,
    latestEarnings: 63.2,
  },
];

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [addStock, setAddStock] = useState(false);
  const searchedStock = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      {
        accessorKey: "symbol",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Building2 size={16} />
            Stock
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <div className="font-bold text-white text-sm">
              {row.original.symbol}
            </div>
            <div className="text-xs text-gray-400 truncate max-w-[120px]">
              {row.original.name}
            </div>
            <div className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full inline-block w-fit mt-1">
              {row.original.exchange}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "purchasePrice",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <DollarSign size={16} />
            Purchase Price
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="font-medium text-white">
            ₹{row.original.purchasePrice.toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => (
          <div className="font-medium text-center bg-gray-700 px-3 py-1 rounded-lg text-white">
            {row.original.quantity}
          </div>
        ),
      },
      {
        accessorKey: "investment",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Investment
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="font-semibold text-white">
            ₹{row.original.investment.toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "portfolioPercentage",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Target size={16} />
            Portfolio %
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(row.original.portfolioPercentage, 100)}%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-white whitespace-nowrap">
              {row.original.portfolioPercentage.toFixed(1)}%
            </span>
          </div>
        ),
      },
      {
        accessorKey: "currentPrice",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CMP
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="font-bold text-blue-400 bg-blue-900 px-3 py-1 rounded-lg">
            ₹{row.original.currentPrice.toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "presentValue",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Present Value
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="font-bold text-white">
            ₹{row.original.presentValue.toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "gainLoss",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gain/Loss
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => {
          const isProfit = row.original.gainLoss >= 0;
          return (
            <div className="flex flex-col">
              <div
                className={`flex items-center gap-1 font-bold ${
                  isProfit ? "text-green-600" : "text-red-600"
                }`}
              >
                {isProfit ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                ₹{Math.abs(row.original.gainLoss).toLocaleString()}
              </div>
              <div
                className={`text-sm ${
                  isProfit ? "text-green-500" : "text-red-500"
                }`}
              >
                ({isProfit ? "+" : ""}
                {row.original.gainLossPercent.toFixed(2)}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "peRatio",
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 text-left font-semibold text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <BarChart3 size={16} />
            P/E Ratio
            {column.getIsSorted() === "asc" ? (
              <ArrowUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown size={14} />
            ) : (
              <ArrowUpDown size={14} />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <div className="font-medium text-white bg-yellow-900 px-3 py-1 rounded-lg text-center">
            {row.original.peRatio.toFixed(1)}
          </div>
        ),
      },
      {
        accessorKey: "latestEarnings",
        header: "Latest EPS",
        cell: ({ row }) => (
          <div className="font-medium text-white">
            ₹{row.original.latestEarnings.toFixed(1)}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const fetchStock = async (symbol: string) => {
    const response = await api.getStockPrice(symbol);
    const data = await response.json();
    return data;
  };

  const searchSymbol = async () => {
    if (!searchedStock.current) return;

    const symbol = searchedStock.current.value;

    const stock = stocks.find((stock) => stock.symbol === symbol);
    if (stock) {
      console.log("stock already added....");
      return;
    }

    try {
      const stockData = await fetchStock(symbol);
      setStocks((prev) => [...prev, stockData]);
    } catch (error) {
      console.error(error);
      console.log("Couldn't fetch stock data...");
    }
  };

  const totalInvestment = 2000;
  const totalCurrentValue = 2450;
  const totalGainLoss = 450;
  const totalGainLossPercent = 40;

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="flex gap-5">
        <button
          className="mb-2 rounded-xl p-2 shadow-md border border-blue-700 bg-blue-700 text-white font-medium cursor-pointer hover:bg-blue-800 hover:border-blue-800"
          onClick={() => setAddStock(true)}
        >
          Add Stock
        </button>
        {addStock && (
          <div>
            <input
              placeholder="Search by stock symbol..."
              ref={searchedStock}
            />
            <button onClick={() => searchSymbol()}>Search</button>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Stock Portfolio Dashboard
        </h1>
        <p className="text-gray-300">Track your investments and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Investment</p>
              <p className="text-2xl font-bold text-white">
                ₹{totalInvestment.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-900 p-3 rounded-lg">
              <DollarSign className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Current Value</p>
              <p className="text-2xl font-bold text-white">
                ₹{totalCurrentValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-900 p-3 rounded-lg">
              <Target className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Gain/Loss</p>
              <p
                className={`text-2xl font-bold ${
                  totalGainLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                ₹{Math.abs(totalGainLoss).toLocaleString()}
              </p>
            </div>
            <div
              className={`${
                totalGainLoss >= 0 ? "bg-green-900" : "bg-red-900"
              } p-3 rounded-lg`}
            >
              {totalGainLoss >= 0 ? (
                <TrendingUp className="text-green-400" size={24} />
              ) : (
                <TrendingDown className="text-red-400" size={24} />
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Overall Return</p>
              <p
                className={`text-2xl font-bold ${
                  totalGainLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {totalGainLoss >= 0 ? "+" : ""}
                {totalGainLossPercent.toFixed(2)}%
              </p>
            </div>
            <div className="bg-purple-900 p-3 rounded-lg">
              <BarChart3 className="text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-700 to-gray-750">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

function AddStock({stocks, onStockAdd}) {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [addedStocks, setAddedStocks] = useState<string[]>([]);
  const [stockData, setStockData] = useState({
    purchasePrice: '',
    quantity: '',
    purchaseDate: '',
  });

  const filteredStocks = allStocks.filter(stock =>
    stock.toLowerCase().includes(query.toLowerCase())
  );

  const handleStockSelect = (stock: string) => {
    if (addedStocks.includes(stock)) {
      alert("This stock is already added.");
      return;
    }
    setSelectedStock(stock);
  };

  const handleFormSubmit = () => {
    if (!stockData.purchasePrice || !stockData.quantity || !stockData.purchaseDate) {
      alert("Please fill all fields.");
      return;
    }

    setAddedStocks(prev => [...prev, selectedStock!]);
    alert(`${selectedStock} added!`);
    setSelectedStock(null);
    setStockData({ purchasePrice: '', quantity: '', purchaseDate: '' });
    setQuery('');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-medium"
        >
          Add Stock
        </button>
      )}

      {showForm && (
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Search stock..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {!selectedStock && (
            <ul className="bg-white border rounded-md max-h-48 overflow-y-auto shadow-md">
              {filteredStocks.map(stock => (
                <li
                  key={stock}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStockSelect(stock)}
                >
                  {stock}
                </li>
              ))}
              {filteredStocks.length === 0 && (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}

          {selectedStock && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-800">
                Adding: <span className="text-blue-600">{selectedStock}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Purchase Price"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  value={stockData.purchasePrice}
                  onChange={(e) =>
                    setStockData({ ...stockData, purchasePrice: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  value={stockData.quantity}
                  onChange={(e) =>
                    setStockData({ ...stockData, quantity: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="w-full md:col-span-2 border border-gray-300 rounded-md px-4 py-2"
                  value={stockData.purchaseDate}
                  onChange={(e) =>
                    setStockData({ ...stockData, purchaseDate: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleFormSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  Save Stock
                </button>
                <button
                  onClick={() => {
                    setSelectedStock(null);
                    setQuery('');
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}