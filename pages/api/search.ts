"use client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q: searchQuery } = req.query;

  if (!searchQuery) {
    res.status(401).json({ error: "`query` is expected" });
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const result = await response.json();
    const data = result['bestMatches'].map((bm: Record<string, unknown>) => ({
      symbol: bm["1. symbol"], 
      name: bm["2. name"], 
      region: bm["4. region"]
    }))

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Server returned with error: ${error}` });
  }
}
