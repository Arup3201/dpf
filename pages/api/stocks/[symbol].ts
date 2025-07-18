"use client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  // This is Node.js server-side code
  try {
    const quoteResponse = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const quotes = await quoteResponse.json();

    if(!quotes["Global Quote"]["05. price"]) {
      res.status(400).json({error: "Failed to fetch quotes"})
    }

    const overviewResponse = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const overview = await overviewResponse.json();

    if(!overview) {
      res.status(400).json({error: "Failed to fetch the overview"})
    }

    const data = {
      "symbol": overview["Symbol"], 
      "name": overview["Name"], 
      "exchange": overview["Exchange"], 
      "price": Number(quotes["Global Quote"]["05. price"]), 
      "sector": overview["Sector"], 
      "peratio": Number(overview["PERatio"]), 
      "eps": Number(overview["EPS"])
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
