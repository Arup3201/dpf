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
  Loader2,
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

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
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
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const totalInvestment = stocks.reduce((acc, cur) => acc + cur.investment, 0);
  const totalCurrentValue = stocks.reduce(
    (acc, cur) => acc + cur.presentValue,
    0
  );
  const totalGainLoss = stocks.reduce(
    (acc, cur) => acc + (cur.presentValue - cur.investment),
    0
  );
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

  const handleStockAdd = async (
    symbol: string,
    price: number,
    quantity: number
  ) => {
    try {
      const data = await api.getStockPrice(symbol);

      const investment = price * quantity;
      const current = data.price * quantity;

      const newStock: Stock = {
        id: data.symbol,
        symbol: data.symbol,
        name: data.name,
        purchasePrice: price,
        quantity: quantity,
        investment: investment,
        portfolioPercentage: Math.round((investment / (totalInvestment+investment)) * 100),
        exchange: data.exchange,
        currentPrice: data.price,
        presentValue: current,
        gainLoss: current - investment,
        gainLossPercent: (current - investment) / investment,
        peRatio: data.peratio,
        latestEarnings: data.eps,
      };
      setStocks((stocksSnapshot) => [newStock, ...stocksSnapshot]);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <AddStock stocks={stocks} onStockAdd={handleStockAdd} />

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
              {totalInvestment !== 0 ? (
                <p
                  className={`text-2xl font-bold ${
                    totalGainLoss >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {totalGainLoss >= 0 ? "+" : ""}
                  {totalGainLossPercent.toFixed(2)}%
                </p>
              ) : (
                <p className={`text-2xl font-bold`}>N/A</p>
              )}
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

function AddStock({ stocks, onStockAdd }) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [stockData, setStockData] = useState({
    purchasePrice: "",
    quantity: "",
  });

  const handleSearchClick = async () => {
    setSearching(true);
    try {
      const matches = await api.searchStock(query);
      const results = matches.map(
        (stock: any) => stock.symbol
      );

      // filter out any tickers with specific class
      setFilteredStocks(results);
    } catch (err) {
      console.log("Failed to search stocks by qeury...");
      return;
    } finally {
      setSearching(false);
    }
  };

  const handleStockSelect = (stock: string) => {
    if (stocks.includes(stock)) {
      alert("This stock is already added.");
      return;
    }
    setSelectedStock(stock);
    setFilteredStocks([]);
  };

  const handleFormSubmit = async () => {
    if (!stockData.purchasePrice || !stockData.quantity) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await onStockAdd(
        selectedStock,
        stockData.purchasePrice,
        stockData.quantity
      );
      alert(`${selectedStock} added!`);
      setSelectedStock(null);
      setStockData({ purchasePrice: "", quantity: "" });
      setQuery("");
    } catch (err) {
      alert("Failed to add the stock");
      return;
    }
  };

  function reset() {
    setQuery("");
    setShowForm(false);
    setFilteredStocks([]);
    setSelectedStock(null);
  }

  return (
    <div className="mb-6">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-md text-lg font-medium"
        >
          Add Stock
        </button>
      )}

      {showForm && (
        <div className="mt-6 space-y-4 relative">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search stock..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearchClick}
              disabled={searching}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer flex gap-1 items-center"
            >
              {searching && <Loader2 className="animate-spin " />}
              Search
            </button>
            <button
              className="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
              onClick={reset}
            >
              Cancel
            </button>
          </div>

          {/* Dropdown */}
          {filteredStocks.length > 0 && !selectedStock && (
            <ul className="absolute top-[100%] left-0 w-full z-10 mt-2 border rounded-md bg-white text-black shadow-lg max-h-56 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <li
                  key={stock}
                  onClick={() => handleStockSelect(stock)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {stock}
                </li>
              ))}
            </ul>
          )}

          {/* Stock Details Form */}
          {selectedStock && (
            <div className="space-y-4 pt-2">
              <div className="text-lg font-semibold">
                Adding: <span className="text-blue-500">{selectedStock}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Purchase Price"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  value={stockData.purchasePrice}
                  onChange={(e) =>
                    setStockData({
                      ...stockData,
                      purchasePrice: e.target.value,
                    })
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
                    setQuery("");
                  }}
                  className="border border-gray-300 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
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
