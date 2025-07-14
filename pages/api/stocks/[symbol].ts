"use client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  // This is Node.js server-side code
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${process.env.FMP_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
