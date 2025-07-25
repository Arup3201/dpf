export const api = {
  // Get current stock price by stock symbol
  getStockPrice: async (symbol: string) => {
    const response = await fetch(`/api/stocks/${symbol}`);
    return response.json();
  },

  // Search stocks by company name
  searchStock: async (query: string) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
  },

};
